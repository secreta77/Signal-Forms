import { Component, input, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { LoginRequest } from '../models/auth.model'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  template: `
    <h2>Login</h2>

    <input type="email" placeholder="Email" [(ngModel)]="email" />
    <input type="password" placeholder="Password" [(ngModel)]="password" />

    <button (click)="submit()" [disabled]="loading()">
      {{ loading() ? 'Loading...' : 'Login' }}
    </button>

    @if (error()) {
      <p style="color: red">{{ error() }}</p>
    }
  `,
})
export class LoginFormComponent {
  loading = input(false)
  error = input<string | null>(null)
  submitted = output<LoginRequest>()

  email = signal('kitchen@itstep.ge')
  password = signal('Kitchen123!')

  submit() {
    this.submitted.emit({ email: this.email(), password: this.password() })
  }
}
