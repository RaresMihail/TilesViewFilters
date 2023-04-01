import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LabelType, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.scss']
})
export class ListSearchComponent implements OnInit {
  @Input() productCategories: string[] = [];
  @Input() productMinAndMaxPrices: number[] = [];

  @Output() productNameSearch = new EventEmitter<string>();
  @Output() productCategoryFilter = new EventEmitter<string>();
  @Output() productMinPriceFilter = new EventEmitter<number>();
  @Output() productMaxPriceFilter = new EventEmitter<number>();

  productName: string = '';
  selectedProductCategory: string = '';

  options: Options = {};

  constructor() { }

  ngOnInit(): void {
    this.categoryFilter(this.productCategories[0]);

    this.options = {
      floor: this.productMinAndMaxPrices[0],
      ceil: this.productMinAndMaxPrices[1],
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `<b>Min price:</b> ${this.productMinAndMaxPrices[0]}`;
          case LabelType.High:
            return `<b>Max price:</b> ${this.productMinAndMaxPrices[1]}`;
          default:
            return `${value} RON`;
        }
      }
    };
  }

  productsSearch(productNameSearch: string): void {
    this.productNameSearch.emit(productNameSearch);
  }

  
  setProductCategory(productCategory: string): void {
    this.selectedProductCategory = productCategory;
  }

  categoryFilter(categoryValue: string): void {
    this.setProductCategory(categoryValue);
    this.productCategoryFilter.emit(categoryValue);
  }

  minPriceFilter(minPriceValue: number): void {
    this.productMinPriceFilter.emit(minPriceValue);
  }

  maxPriceFilter(maxPriceValue: number): void {
    this.productMaxPriceFilter.emit(maxPriceValue);
  }
}
