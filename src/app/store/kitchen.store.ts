import { inject } from '@angular/core'
import { pipe, switchMap, tap } from 'rxjs'
import { tapResponse } from '@ngrx/operators'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { Order } from '../models/order.model'
import { KitchenService } from '../services/kitchen.service'

type KitchenState = {
  orders: Order[]
  loading: boolean
  error: string | null
}

export const KitchenStore = signalStore(
  { providedIn: 'root' },

  withState<KitchenState>({ orders: [], loading: false, error: null }),

  withMethods((store, service = inject(KitchenService)) => ({
    loadOrders: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          service.getQueue().pipe(
            tapResponse({
              next: (orders) => patchState(store, { orders, loading: false }),
              error: () =>
                patchState(store, { loading: false, error: 'შეკვეთები ვერ ჩაიტვირთა' }),
            }),
          ),
        ),
      ),
    ),
  })),
)
