import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../../../shared/models/pageble.model';
import { Profile } from '../../profile/models/profile.model';

@Injectable({ providedIn: 'root' })
export class SubscribersService {

  private http = inject(HttpClient);

  baseUrl = 'https://icherniakov.ru/yt-course';

  getSubscribers(accountId: number) {
    return this.http.get<Pageable<Profile>>(
      `${this.baseUrl}/account/subscribers/${accountId}`,
      {
        params: { page: 1, size: 10 }
      }
    );
  }
}
