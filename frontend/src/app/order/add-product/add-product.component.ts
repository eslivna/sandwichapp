import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../product/product.model';
import { SandwichDataService } from '../../product/sandwich-data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
    private _sandwhichDataService: SandwichDataService,
    private _router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.product = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      ingredients: ['', Validators.required],
      category: ['', [Validators.required, Validators.minLength(4)]],
      price: [0, [Validators.required, Validators.min(0)]]
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
      },
      () => {
        this._router.navigate(['/admin/manage']).then(() =>
          this.snackBar.open(`Product ${product.name} successfully added`, '', {
            duration: 2000
          })
        );
      }
    );
  }
}
