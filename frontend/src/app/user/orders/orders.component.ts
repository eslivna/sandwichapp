import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../order/order.model';

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
    'created'
  ];
  @Input()
  data: Order[];

  constructor() {}

  ngOnInit() {}
}
