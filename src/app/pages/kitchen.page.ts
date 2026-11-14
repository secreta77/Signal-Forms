import { Component, inject, OnInit } from '@angular/core'
import { OrderCardComponent } from '../components/order-card.component'
import { AuthStore } from '../store/auth.store'
import { KitchenStore } from '../store/kitchen.store'

@Component({
  selector: 'app-kitchen',
  imports: [OrderCardComponent],
  template: `
    <h2>Kitchen Orders</h2>
    <button (click)="auth.logout()">Logout</button>
    <button (click)="store.loadOrders()">Refresh</button>

    @if (store.loading()) {
      <p>Loading...</p>
    }
    @if (store.error()) {
      <p style="color: red">{{ store.error() }}</p>
    }

    @for (order of store.orders(); track order.id) {
      <app-order-card [order]="order" />
    } @empty {
      <p>შეკვეთები არ არის</p>
    }
  `,
})
export class KitchenPage implements OnInit {
  store = inject(KitchenStore)
  auth = inject(AuthStore)

  ngOnInit() {
    this.store.loadOrders()
  }
}
