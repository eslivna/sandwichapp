import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import {
  httpInterceptorProviders,
  basehttpInterceptorProviders
} from '../http-interceptors';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductResolver } from './product-resolver';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  { path: 'manage', component: ManageProductsComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'orders', component: OrderComponent },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    resolve: { product: ProductResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    TagInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OrderComponent,
    OrderDetailsComponent,
    ManageProductsComponent,
    AddProductComponent,
    EditProductComponent
  ],
  providers: [ProductResolver]
})
export class OrderModule {}
