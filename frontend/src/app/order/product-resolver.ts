import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Product } from '../product/product.model';
import { Observable } from 'rxjs';
import { SandwichDataService } from '../product/sandwich-data.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private sandwichService: SandwichDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    return this.sandwichService.getProduct(route.params.id);
  }
}
