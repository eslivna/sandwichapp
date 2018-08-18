import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { OrderService } from '../../order/order.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-dialog-confirm-order',
  templateUrl: './dialog-confirm-order.component.html',
  styleUrls: ['./dialog-confirm-order.component.css']
})
export class DialogConfirmOrderComponent implements OnInit {
  public errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ordeService: OrderService,
    public snackBar: MatSnackBar
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  onConfirm() {
    this._ordeService.addNewOrder(this.data.order).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        this.errorMsg =
          'Error ${error.status} while adding your order {error.error}';
      },
      () => {
        this.dialogRef.close();
        this.snackBar.open('We received your order successfully.', '', {
          duration: 2000
        });
      }
    );
  }
  ngOnInit() {}
}
