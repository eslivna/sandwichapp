import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';
import { AddProductComponent } from './add-product/add-product.component';
import { DialogConfirmOrderComponent } from './dialog-confirm-order/dialog-confirm-order.component';
import { httpInterceptorProviders, basehttpInterceptorProviders } from '../http-interceptors';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { TagInputModule } from '../../../node_modules/ngx-chips';
import { CategoryFilterPipe } from './category-filter.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { OrderModule } from '../order/order.module';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductResolver } from './product-resolver';

const routes = [
  { path: 'manage', component: ManageProductsComponent },
  { path: 'list', component: ProductComponent },
  { path: 'add', component: AddProductComponent },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    resolve: { product: ProductResolver }
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    MaterialModule,
    OrderModule,
    RouterModule.forChild(routes),
    ScrollToModule.forRoot()
  ],
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    AddProductComponent,
    DialogConfirmOrderComponent,
    CategoryFilterPipe,
    ManageProductsComponent,
    EditProductComponent
  ],
  providers: [
    basehttpInterceptorProviders,
    httpInterceptorProviders,
    ProductResolver
  ],
  entryComponents: [DialogConfirmOrderComponent]
})
export class ProductModule {}
