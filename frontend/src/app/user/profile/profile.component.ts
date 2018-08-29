import { Component, OnInit } from '@angular/core';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Order } from '../../order/order.model';
import { OrderService } from '../../order/order.service';
import { AuthenticationService } from '../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: Order[] = [];
  isLoadingResults = true;

  constructor(
    private _orderService: OrderService,
    private _authService: AuthenticationService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._orderService.getOrders(this._authService.id);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Return empty data.
          return observableOf([]);
        })
      )
      .subscribe(data => (this.data = data));
  }

  get currentUser(): Observable<string> {
    return this._authService.user$;
  }

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
    const orderDate = new Date(order.orderDate);
    if (this.daysBetween(date, orderDate) >= 0) {
      this._orderService.removeOrder(order).subscribe(
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
