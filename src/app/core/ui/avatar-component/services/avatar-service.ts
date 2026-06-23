import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../../../features/profile/models/profile.model';
import { Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvatarService {

  private http = inject(HttpClient);

  private baseUrl = 'https://icherniakov.ru/yt-course/';

  private cache = new Map<number, Profile>();

  private requests = new Map<number, Observable<Profile>>();

  getProfile(id: number): Observable<Profile> {

    const cached = this.cache.get(id);
    if (cached) {
      return of(cached);
    }

    const pending = this.requests.get(id);
    if (pending) {
      return pending;
    }

    const request$ = this.http.get<Profile>(
      `${this.baseUrl}account/${id}`
    ).pipe(
      tap(profile => {
        this.cache.set(id, profile);
        this.requests.delete(id);
      }),
      shareReplay(1)
    );

    this.requests.set(id, request$);

    return request$;
  }

  clearCache(id?: number) {
    if (id) {
      this.cache.delete(id);
      this.requests.delete(id);
    } else {
      this.cache.clear();
      this.requests.clear();
    }
  }
}
