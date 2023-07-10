import { CartItem } from './../../models/cart';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{

  @Input() product!: Product;
  count = ['1', '2', '3', '4', '5'];
  star = 0;
  quantity= "1";
  constructor(  private cartService: CartService, private _snackBar: MatSnackBar) {
    this.product = {
      id: 0,
      title: '',
      price: 0,
      image: '',
      description: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };

  }
  ngOnInit(): void {
    this.star = Number(this.product.rating.rate.toFixed(0))
  }

  onClick(): void {
    const cartItems: CartItem[] = this.cartService.getCartItems();
    let itemInCart = cartItems.find(item => item.id === this.product.id);
    if ( itemInCart) {
      let qty = parseInt(itemInCart.quantity)
      qty += 1;
      itemInCart.quantity = qty.toString()
      itemInCart ? this.cartService.addToCart(cartItems) : null;
      this._snackBar.open(`The cart have been updated`, 'Ok', { duration: 3000 });
    } else {
      cartItems.push(Object.assign(this.product, { quantity: this.quantity}));
      this.cartService.addToCart(cartItems);
      this._snackBar.open(`${this.product.title} added to the cart`, 'Ok', { duration: 3000 });

    }
  }
}
