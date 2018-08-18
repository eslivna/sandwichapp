import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SandwichDataService } from '../sandwich-data.service';
import { Product } from '../product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs/internal/Observable';
import { of } from '../../../../node_modules/rxjs';
import { filter } from '../../../../node_modules/rxjs/operators';
import {
  TagInputForm,
  TagInputComponent
} from '../../../../node_modules/ngx-chips';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public product: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private _sandwhichDataService: SandwichDataService
  ) {}

  ngOnInit() {
    this.product = this.fb.group({
      name: [''],
      ingredients: [''],
      category: [''],
      price: []
    });
  }

  onSubmit() {
    const product = new Product(
      this.product.value.name,
      this.product.value.ingredients,
      this.product.value.price,
      this.product.value.category
    );

    this._sandwhichDataService.addNewProduct(product).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding product  ${
          product.name
        }: ${error.error}`;
      }
    );
  }
}
