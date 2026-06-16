import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { SearchPage } from './pages/search-page/search-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { LayoutComponent } from './components/layout-component/layout-component';
import { canActivateAuth } from './pages/login-page/guards/access.guard';

export const routes: Routes = [{
  path: '', component: LayoutComponent, children: [
    {path: '', component: SearchPage},
    {path: 'profile', component: ProfilePage}
  ],
  canActivate: [canActivateAuth]
},
  {path: 'login', component: LoginPage},
];

