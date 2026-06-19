import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Profile } from '../../profile/models/profile.model';
import { Pageable } from '../../../shared/models/pageble.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private http = inject(HttpClient);

  private baseUrl = 'https://icherniakov.ru/yt-course';

  // 🔥 единый источник данных
  profiles = signal<Profile[]>([]);

  setProfiles(profiles: Profile[]) {
    this.profiles.set(profiles);
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(
      `${this.baseUrl}/account/test_accounts`
    );
  }

  filterProfiles(params: Record<string, any>) {

    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<Pageable<Profile>>(
      `${this.baseUrl}/account/accounts`,
      { params: httpParams }
    );
  }
}
