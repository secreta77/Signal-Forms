import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { map, Observable } from 'rxjs'
import { API_URL } from '../api'
import { Order, OrderQueueResponse } from '../models/order.model'

@Injectable({ providedIn: 'root' })
export class KitchenService {
  private http = inject(HttpClient)

  getQueue(): Observable<Order[]> {
    return this.http
      .get<OrderQueueResponse>(`${API_URL}/enterprise/orders/queue`)
      .pipe(map((res) => res.orders ?? []))
  }
}
