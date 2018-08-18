import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) {}

  get orders(): Observable<Order[]> {
    return this.http
      .get(`${this._appUrl}/orders/`)
      .pipe(map((list: any[]): Order[] => list.map(Order.fromJSON)));
  }

  addNewOrder(order: Order): Observable<Order> {
    return this.http
      .post(`${this._appUrl}/orders/`, order)
      .pipe(map(Order.fromJSON));
  }

  getOrders(userId: string): Observable<Order[]> {
    return this.http
      .get(`${this._appUrl}/order/${userId}`)
      .pipe(map((list: any[]): Order[] => list.map(Order.fromJSON)));
  }

  removeOrder(order: Order): Observable<Order> {
    return this.http
      .delete(`${this._appUrl}/order/${order.id}`)
      .pipe(map(Order.fromJSON));
  }
}
