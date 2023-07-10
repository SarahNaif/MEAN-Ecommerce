import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  storage = window.localStorage;
  constructor() { }



  addToCart(cartpro: CartItem[]): void {
    this.storage.setItem('cart', JSON.stringify(cartpro));

  }
  getCartItems(): CartItem[] | [] {
    const cartItems = this.storage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  removeFromCart(cartpro: CartItem): void {
    let cartpros = this.getCartItems().filter(item => item.id !== cartpro.id);
    this.clearCart();
    this.addToCart(cartpros);
  }

  clearCart(): void {
    this.storage.clear();
  }


}
