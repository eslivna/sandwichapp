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

  constructor(
    private _oderService: OrderService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  daysBetween(first, second) {
    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(
      second.getFullYear(),
      second.getMonth(),
      second.getDate()
    );

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
  }

  deleteOrder(order: Order) {
    const date = new Date();
    const orderDate = new Date(order.orderDate)
    if (this.daysBetween(date, orderDate) >= 0) {
      this._oderService.removeOrder(order).subscribe(
        item => (this.data = this.data.filter(val => item.id !== val.id)),
        (error: HttpErrorResponse) => {
          this.snackBar.open(
            'Error ${error.status} while removing the order',
            '',
            { duration: 2000 }
          );
        },
        () => {
          this.snackBar.open(
            `Successfully deleted the order with the following product: ${
              order.productName
            }`,
            '',
            { duration: 2000 }
          );
        }
      );
    } else {
      this.snackBar.open(
        'Cannot delete orders that have already been delivered',
        '',
        { duration: 2000 }
      );
    }
  }
}
