import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart!: CartItem[];
  totalPrice!: number;
  @Output() userInfo = new EventEmitter();
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCartItems();

  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * Number(item.quantity))
      .reduce((prev, current) => prev + current, 0);
  }

  }


