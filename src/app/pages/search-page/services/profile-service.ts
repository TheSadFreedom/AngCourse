import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ProfileInterface } from '../interfaces/profile.interface';


@Service({ } )

export class ProfileService{

  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts(){
    return this.http.get<ProfileInterface[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
