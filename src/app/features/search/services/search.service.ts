import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponse } from '../models/search.model';
import { Profile } from '../../profile/models/profile.model';

@Service()
export class SearchService {

  private http = inject(HttpClient);

  private baseUrl = 'https://icherniakov.ru/yt-course';

  getTestAccounts() {
    return this.http.get<Profile[]>(
      `${this.baseUrl}/account/test_accounts`
    );
  }

  searchUsers(query: string) {
    return this.http.get<SearchResponse>(
      `${this.baseUrl}/account/subscribers`,
      {
        params: { query }
      }
    );
  }
}
