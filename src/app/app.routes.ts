import { Routes } from '@angular/router'
import { authGuard } from './guards/auth.guard'
import { KitchenPage } from './pages/kitchen.page'
import { LoginPage } from './pages/login.page'

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'kitchen', component: KitchenPage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
]
