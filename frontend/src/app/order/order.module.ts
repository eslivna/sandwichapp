import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { httpInterceptorProviders, basehttpInterceptorProviders } from '../http-interceptors';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes = [{ path: 'orders', component: OrderComponent }];

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  declarations: [OrderComponent, OrderDetailsComponent],
  exports: [OrderComponent, OrderDetailsComponent],
  providers: [basehttpInterceptorProviders, httpInterceptorProviders]
})
export class OrderModule {}
