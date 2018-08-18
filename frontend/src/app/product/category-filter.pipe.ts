import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!category || category.length === 0) {
      return products;
    }
    return products.filter(prod =>
      prod.category.toLowerCase().startsWith(category.toLowerCase())
    );
  }
}
