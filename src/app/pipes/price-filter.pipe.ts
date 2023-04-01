import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../model/products.model';

@Pipe({
  name: 'priceFilter',
})
export class PriceFilterPipe implements PipeTransform {

  transform(products: Product[] | undefined, minValue: number | null, maxValue: number | null): Product[] {
    if (!products) {
      return [];
    }

    if (!minValue || !maxValue) {
        return products;
    }

    return products.filter(product => product.price >= minValue && product.price <= maxValue);
  }
}
