import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  
})
export class NavBarComponent {
constructor(private cartService: CartService){}

getItem(): number{
  const cartItems: CartItem[] = this.cartService.getCartItems();
  return cartItems.length
}

}
