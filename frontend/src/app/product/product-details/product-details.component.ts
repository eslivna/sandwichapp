import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  @Output() public clickOrder = new EventEmitter<Product>();
  panelOpenState = false;

  constructor() {}

  openDialog(): void {
    this.clickOrder.emit(this.product);
  }

  ngOnInit() {}
}
