import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';
import {
  ActivatedRoute,
  Router
} from '../../../../node_modules/@angular/router';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { Product } from '../../product/product.model';
import { SandwichDataService } from '../../product/sandwich-data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public form: FormGroup;
  public _product: Product;
  public errorMsg: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _sandwichDataService: SandwichDataService,
    private _router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      ingredients: ['', Validators.required],
      category: ['', [Validators.required, Validators.minLength(4)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.data.subscribe(item => {
      this._product = item['product'];
      this.form.get('name').setValue(item['product'].name);
      this.form.get('ingredients').setValue(item['product'].ingredients);
      this.form.get('category').setValue(item['product'].category);
      this.form.get('price').setValue(item['product'].price);
    });
  }

  get product() {
    return this._product;
  }

  onSubmit() {
    this._product.name = this.form.value.name;
    this._product.ingredients = this.form.value.ingredients;
    this._product.price = this.form.value.price;
    this._product.category = this.form.value.category;

    this._sandwichDataService.updateProduct(this._product).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while updating product  ${
          this.product.name
        }: ${error.error}`;
      },
      () => {
        this._router.navigate(['/admin/manage']).then(() =>
          this.snackBar.open(
            `Product ${this._product.name} successfully updated`,
            '',
            {
              duration: 2000
            }
          )
        );
      }
    );
  }
}
