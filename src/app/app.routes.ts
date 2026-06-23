import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { SearchPage } from './features/search/pages/search-page/search-page';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { ProfilePage } from './features/profile/page/profile-page/profile-page';
import { authGuard } from './core/auth/auth.guard';
import { chatsRoutes } from './features/chats/routes/chatsRoutes';


export const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'profile/:id', component: ProfilePage},
      {path: 'search', component: SearchPage},
      {
        path: 'chats',
        loadChildren:() => chatsRoutes
      },
    ],
    canActivate: [authGuard]
  },
  {path: 'login', component: LoginPage}
];
