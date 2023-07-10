import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Product';
  products: Product[] = [];

  constructor(private proServ: ProductService) { }

  ngOnInit(): void {
    this.proServ.getProducts().subscribe(data => {
      this.products = data;
    });

  }

}
