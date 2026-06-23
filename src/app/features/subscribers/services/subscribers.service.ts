import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pageable } from '../../../shared/models/pageble.model';
import { Profile } from '../../profile/models/profile.model';

@Injectable({ providedIn: 'root' })
export class SubscribersService {

  private http = inject(HttpClient);

  baseUrl = 'https://icherniakov.ru/yt-course';

  getSubscribers(
    accountId: number,
    options?: { page?: number; size?: number }
  ) {

    const params = new HttpParams()
      .set('page', String(options?.page ?? 1))
      .set('size', String(options?.size ?? 10));

    return this.http.get<Pageable<Profile>>(
      `${this.baseUrl}/account/subscribers/${accountId}`,
      { params }
    );
  }
}
