import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit{

  firstName!: string | null;
  totalPrice!: number;
  constructor(private router: ActivatedRoute) {}

   ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.firstName = params.get('firstName');
      this.totalPrice = Number(params.get('totalPrice'));
    });


  }

}




