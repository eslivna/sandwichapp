import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';
import { DialogConfirmOrderComponent } from './dialog-confirm-order/dialog-confirm-order.component';
import {
  httpInterceptorProviders,
  basehttpInterceptorProviders
} from '../http-interceptors';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { CategoryFilterPipe } from './category-filter.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

const routes = [{ path: 'list', component: ProductComponent }];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ScrollToModule.forRoot()
  ],
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    DialogConfirmOrderComponent,
    CategoryFilterPipe
  ],
  providers: [],
  entryComponents: [DialogConfirmOrderComponent]
})
export class ProductModule {}
