import { DatePipe } from '@angular/common'
import { Component, input } from '@angular/core'
import { Order } from '../models/order.model'

@Component({
  selector: 'app-order-card',
  imports: [DatePipe],
  template: `
    <div style="border: 1px solid #ccc; margin: 8px 0; padding: 8px">
      <b>{{ order().customerName }}</b> — {{ order().status }}<br />
      ნივთები: {{ order().itemCount }} | ჯამი: {{ order().total }} ₾<br />
      ოფიციანტი: {{ order().assignedWaiter ?? '—' }}<br />
      შექმნილია: {{ order().createdAt | date: 'HH:mm:ss' }}
    </div>
  `,
})
export class OrderCardComponent {
  order = input.required<Order>()
}
