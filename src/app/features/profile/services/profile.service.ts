import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { Pageable } from '../../../shared/models/pageble.model';

type PaginationParams = {
  page?: number;
  size?: number;
};

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private http = inject(HttpClient);

  private baseApiUrl = 'https://icherniakov.ru/yt-course/account/';

  private buildParams(params?: PaginationParams) {
    return {
      page: params?.page ?? 1,
      size: params?.size ?? 10
    };
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}me`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}me`,
      profile
    );
  }

  getSubscribers(accountId: number, params?: PaginationParams) {
    return this.http.get<Pageable<Profile>>(
      `${this.baseApiUrl}subscribers/${accountId}`,
      { params: this.buildParams(params) }
    );
  }

  uploaderAvatar(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  return this.http.post(
    `${this.baseApiUrl}upload_image`,
    formData
  );
}
}
