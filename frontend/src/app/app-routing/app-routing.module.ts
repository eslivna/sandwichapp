import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AuthGuardService } from '../user/auth-guard.service';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AdminAuthGuardService } from '../user/admin-auth-guard.service';

const appRoutes: Routes = [
  
  {
    path: 'admin',
    canActivate: [AdminAuthGuardService],
    loadChildren: '../order/order.module#OrderModule',
  },
  {
    path: 'product',
    canActivate: [AuthGuardService],
    loadChildren: '../product/product.module#ProductModule',
    data: { preload: true }
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  providers: [SelectivePreloadStrategy],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
