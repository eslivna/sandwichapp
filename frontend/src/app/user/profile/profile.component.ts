import { Component, OnInit } from '@angular/core';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Order } from '../../order/order.model';
import { OrderService } from '../../order/order.service';
import { AuthenticationService } from '../authentication.service';

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
    private _authService: AuthenticationService
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

  get isAdmin(): Boolean {
    const tes = this._authService.isAdmin;
    console.log(tes);
    return tes;
  }
}
