import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { SandwichDataService } from './sandwich-data.service';
import { Product } from './product.model';
import { Observable } from '../../../node_modules/rxjs';

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
