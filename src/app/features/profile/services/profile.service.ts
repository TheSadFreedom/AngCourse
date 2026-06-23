import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { Pageable } from '../../../shared/models/pageble.model';
import { map, shareReplay, tap } from 'rxjs';

type PaginationParams = {
  page?: number;
  size?: number;
};

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private http = inject(HttpClient);

  private baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  private me$ = this.http.get<Profile>(
    `${this.baseApiUrl}account/me`
  ).pipe(
    tap(profile => this.me.set(profile)),
    shareReplay(1)
  );

  getMe() {
    return this.me$;
  }

  getMyId(): number | null {
  return this.me()?.id ?? null;
  }

  refreshMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap(profile => this.me.set(profile)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(limit = 3) {
    return this.http.get<Pageable<Profile>>(
      `${this.baseApiUrl}account/subscribers/`
    ).pipe(
      map(res => res.items.slice(0, limit))
    );
  }

  getSubscribers(accountId: number, params?: PaginationParams) {
    const httpParams = new HttpParams()
      .set('page', params?.page ?? 1)
      .set('size', params?.size ?? 10);

    return this.http.get<Pageable<Profile>>(
      `${this.baseApiUrl}subscribers/${accountId}`,
      { params: httpParams }
    );
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile
    ).pipe(
      tap(updated => this.me.set(updated))
    );
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageable<Profile>>(
      `${this.baseApiUrl}account/accounts`,
      { params }
    ).pipe(
      tap(res => this.filteredProfiles.set(res.items))
    );
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    ).pipe(
      tap(profile => this.me.set(profile))
    );
  }
}
