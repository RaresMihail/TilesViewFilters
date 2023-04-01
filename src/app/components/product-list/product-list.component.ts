import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[]>;
  
  productNameSearch: string = '';
  productCategoryFilter: string = '';
  productMinPrice: number = 0;
  productMaxPrice: number = 0;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  updateProductNameSearch(productNameSearch: string): void {
    this.productNameSearch = productNameSearch;
  }

  updateProductCategoryFilter(productCategoryFilter: string): void {
    this.productCategoryFilter = productCategoryFilter;
  }

  getProductCategories(products: Product[]): string[] {
    const productCategories: string[] = [];

    for(const product of products) {
      if (!productCategories.includes(product.category)) {
        productCategories.push(product.category);
      }
    }

    return productCategories;
  }

  getMinAndMaxPrices(products: Product[]): number[] {
    let minPrice: number = products[0].price;
    let maxPrice: number = products[0].price;
    
    for(const product of products) {
      if (product.price < minPrice) {
        minPrice = product.price;
      }

      if (product.price > maxPrice) {
        maxPrice = product.price;
      }
    }

    if (!this.productMinPrice && !this.productMaxPrice) {
      this.productMinPrice = minPrice;
      this.productMaxPrice = maxPrice;
    }
    
    return [minPrice, maxPrice];
  }

  updateProductMinPriceFilter(productMinPriceFilter: number): void {
    this.productMinPrice = productMinPriceFilter;
  }

  updateProductMaxPriceFilter(productMaxPriceFilter: number): void {
    this.productMaxPrice = productMaxPriceFilter;
  }
}
