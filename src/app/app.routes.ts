import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { authGuard } from './core/auth/auth.guard';
import { SearchPage } from './features/search/pages/search-page/search-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { ProfilePage } from './features/profile/page/profile-page/profile-page';
import { SubscribersPage } from './features/subscribers/page/subscribers-page/subscribers-page';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: SearchPage },
      { path: 'search', component: SearchPage },
      { path: 'profile', component: ProfilePage },
      { path: 'subscribers', component: SubscribersPage },
    ]
  },
  {
    path: 'login',
    component: LoginPage
  }
];
