import { computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { pipe, switchMap, tap } from 'rxjs'
import { tapResponse } from '@ngrx/operators'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { LoginRequest } from '../models/auth.model'
import { AuthService } from '../services/auth.service'

type AuthState = {
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ token }) => ({
    isLoggedIn: computed(() => !!token()),
  })),

  withMethods((store, service = inject(AuthService), router = inject(Router)) => ({
    login: rxMethod<LoginRequest>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((credentials) =>
          service.login(credentials).pipe(
            tapResponse({
              next: (res) => {
                localStorage.setItem('token', res.accessToken)
                patchState(store, { token: res.accessToken, loading: false })
                router.navigate(['/kitchen'])
              },
              error: () =>
                patchState(store, { loading: false, error: 'მეილი ან პაროლი არასწორია' }),
            }),
          ),
        ),
      ),
    ),

    logout() {
      localStorage.removeItem('token')
      patchState(store, { token: null })
      router.navigate(['/login'])
    },
  })),
)
