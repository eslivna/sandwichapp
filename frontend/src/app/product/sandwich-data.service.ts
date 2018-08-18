import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SandwichDataService {
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) {}

  get products(): Observable<Product[]> {
    return this.http
      .get(`${this._appUrl}/products/`)
      .pipe(map((list: any[]): Product[] => list.map(Product.fromJSON)));
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get(`${this._appUrl}/product/${id}`)
      .pipe(map(Product.fromJSON));
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http
      .post(`${this._appUrl}/products/`, product)
      .pipe(map(Product.fromJSON));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put(`${this._appUrl}/product/${product.id}`, product)
      .pipe(map(Product.fromJSON));
  }

  removeProduct(product: Product): Observable<Product> {
    return this.http
      .delete(`${this._appUrl}/product/${product.id}`)
      .pipe(map(Product.fromJSON));
  }
}
