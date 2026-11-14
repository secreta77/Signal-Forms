import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { API_URL } from '../api'
import { AuthResponse, LoginRequest } from '../models/auth.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)

  login(body: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, body)
  }
}
