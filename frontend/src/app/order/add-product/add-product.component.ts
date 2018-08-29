import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../product/product.model';
import { SandwichDataService } from '../../product/sandwich-data.service';

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
