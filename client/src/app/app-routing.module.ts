import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
{path:"", component:ProductListComponent},
{path:"product/:id", component:ProductItemDetailComponent},
{path:"cart", component:CartComponent},
{path: 'success/:firstName/:totalPrice', component: ConfirmOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
