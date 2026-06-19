import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError
} from 'rxjs';

import { AuthService } from './auth-service';

const refreshSubject = new BehaviorSubject<string | null>(null);
let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const token = auth.token;

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError(error => {
      const isAuthError =
        error.status === 401 || error.status === 403;

      if (!isAuthError) {
        return throwError(() => error);
      }

      // Не пытаемся обновлять refresh запрос
      if (req.url.includes('refresh')) {
        auth.logout();
        return throwError(() => error);
      }

      // Если refresh_token отсутствует
      if (!auth.refreshToken) {
        auth.logout();
        return throwError(() => error);
      }

      // Первый запрос запускает refresh
      if (!isRefreshing) {
        isRefreshing = true;
        refreshSubject.next(null);

        return auth.refresh().pipe(
          switchMap(tokens => {
            isRefreshing = false;

            refreshSubject.next(tokens.access_token);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${tokens.access_token}`
              }
            });

            return next(retryReq);
          }),
          catchError(refreshError => {
            isRefreshing = false;
            auth.logout();

            return throwError(() => refreshError);
          })
        );
      }

      // Остальные запросы ждут новый токен
      return refreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token!}`
            }
          });

          return next(retryReq);
        })
      );
    })
  );
};
