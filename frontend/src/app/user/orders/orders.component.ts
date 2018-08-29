import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../order/order.model';
import { OrderService } from '../../order/order.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'price',
    'orderDate',
    'created',
    'actions'
  ];
  @Input()
  data: Order[];
  @Output()
  public removeOrder = new EventEmitter<Order>();

  constructor() {}

  ngOnInit() {}

  deleteOrder(order: Order) {
    this.removeOrder.emit(order);
  }
}
