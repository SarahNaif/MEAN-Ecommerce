import { CartService } from 'src/app/services/cart.service';
import { CartItem } from './../../models/cart';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cart!: CartItem[];
  @Input() item!: CartItem;
  @Output() change: EventEmitter<CartItem[]> = new EventEmitter();
  quantity!: string;
  count = ['1', '2', '3', '4', '5'];
  constructor(private cartService:CartService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.quantity = this.item.quantity;
  }
  onRemoveItem (item:CartItem):void {
    this._snackBar.open(` ${item.title} item removed from cart.`, 'Ok', {
      duration: 4000,
    });
    this.cartService.removeFromCart(item)
    window.location.reload();
  }

  onChange(item:CartItem):void{
    const index = this.cart.indexOf(item);
    this.cart[index] = item;
    this.cart[index].quantity = this.quantity
    this.cartService.addToCart(this.cart);
    this._snackBar.open(`${item.title} item updated to cart`, 'Ok', { duration: 3000 });
    this.change.emit(this.cart);

  }

}
