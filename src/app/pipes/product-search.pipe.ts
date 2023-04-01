import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../model/products.model';

@Pipe({
    name: 'productSearch',
})
export class ProductSearch implements PipeTransform {
    transform(products: Product[] | undefined, value: string | null): Product[] {
        if (!products) {
          return [];
        }

        if (!value) {
            return products;
        }

        return products.filter(product => product.name.indexOf(value) !== -1);
    }
}
