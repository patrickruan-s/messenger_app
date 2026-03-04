import { Routes } from '@angular/router';
import { Messages } from './features/messages/messages';
import { Login } from './features/auth/login';

export const routes: Routes = [
  { path: '', component: Login},
  { path: 'messages', component: Messages }
];
