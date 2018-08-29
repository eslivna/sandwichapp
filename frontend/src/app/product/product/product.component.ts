import { Component, OnInit, NgModule } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SandwichDataService } from '../sandwich-data.service';
import { Product } from '../product.model';
import { FormControl } from '../../../../node_modules/@angular/forms';
import {
  DateAdapter,
  MatDialog
} from '../../../../node_modules/@angular/material';
import { DialogConfirmOrderComponent } from '../dialog-confirm-order/dialog-confirm-order.component';
import { Order } from '../../order/order.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data: Product[] = [];
  isLoadingResults = true;
  categories = new Set<string>();
  date = new FormControl(new Date());

  constructor(
    private _sandwichDataService: SandwichDataService,
    private adapter: DateAdapter<any>,
    public dialog: MatDialog,
    private _authenticationService: AuthenticationService
  ) {
    this.adapter.setLocale('nl');
  }

  openDialog(product: Product) {
    const order = new Order(
      product.name,
      product.price,
      this._authenticationService.id,
      this.date.value,
      new Date()
    );
    this.dialog.open(DialogConfirmOrderComponent, {
      minWidth: '350px',
      maxHeight: '650px',
      maxWidth: '400px',
      data: { order: order }
    });
  }

  ngOnInit() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._sandwichDataService.products;
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.categories = new Set(this.data.map(p => p.category));
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Return empty data.
          return observableOf([]);
        })
      )
      .subscribe(
        data => (
          (this.data = data),
          (this.categories = new Set(this.data.map(p => p.category)))
        )
      );
  }
}
