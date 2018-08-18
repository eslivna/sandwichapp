import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'price', 'orderDate', 'created'];
  @Input() data: Order[];

  constructor() {}

  ngOnInit() {}
}
