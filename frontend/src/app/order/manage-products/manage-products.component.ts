import { Component, OnInit } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { Product } from '../../product/product.model';
import { SandwichDataService } from '../../product/sandwich-data.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'category',
    'ingredients',
    'price',
    'actions'
  ];
  data: Product[] = [];
  isLoadingResults = true;

  public errorMsg: string;

  constructor(
    private _sandwichDataService: SandwichDataService,
    public snackBar: MatSnackBar
  ) {}

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

  removeProduct(product: Product) {
    console.log(product);
    this._sandwichDataService.removeProduct(product).subscribe(
      item => (this.data = this.data.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing recipes for ${
          product.name
        }: ${error.error}`;
      },
      () => {
        this.snackBar.open(
          `Successfully deleted product: ${product.name}`,
          '',
          { duration: 2000 }
        );
      }
    );
  }
}
