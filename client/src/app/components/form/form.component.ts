import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder,FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit{
  @Input() totalPrice!: number;
  createForm!: FormGroup;
  submitted!: false;
  userName!: string;
  @Output() userInfo = new EventEmitter();

  constructor(private cartService: CartService,private form: FormBuilder,  private router: Router) {

  }

  ngOnInit(): void {
    this.createForm = this.form.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
    });



  }



  get firstName() {
    return this.createForm.get('firstName');
  }
  get address() {
    return this.createForm.get('address');
  }
  get creditCard() {
    return this.createForm.get('creditCard');
  }

  onSubmit() {
    this.cartService.clearCart();
    this.router.navigate([`success/${this.createForm.value.firstName}/${this.totalPrice}`]);
  }
}
