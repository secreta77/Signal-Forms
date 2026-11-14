import { Component, inject } from '@angular/core'
import { LoginFormComponent } from '../components/login-form.component'
import { AuthStore } from '../store/auth.store'

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  template: `
    <app-login-form
      [loading]="store.loading()"
      [error]="store.error()"
      (submitted)="store.login($event)"
    />
  `,
})
export class LoginPage {
  store = inject(AuthStore)
}
