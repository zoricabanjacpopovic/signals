import { Component, computed, effect, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
   <h1> Shoping cart</h1>
  <select 
    [ngModel] = "quantity()"
    (ngModelChange) = "onQuantitySelected($event)">
    <option disabled value="">--Select a quantity -- </option>
    <option *ngFor="let q of qtyAvailable()"> {{ q }} </option>
  </select>

   <div> {{ quantity() }}</div>
   <div> {{ selectedProduct().name }} </div>
   <div [style.color="color()"]> {{ selectedProduct().price }} </div>

   <div> Extended {{exPrice() }} </div>
   `
})


export class App {
  name = 'Angular';

  quantity = signal(1);
  qtyAvailable = signal ([1,2,3,4,5]);

  selectedProduct = signal<Product>({
    id:5,
    name: 'prod',
    price: 12
  });

  constructor (){
    console.log('In constructor', this.quantity());

    effect(() => console.log('Inf effect', this.quantity()));
    this.quantity.update(q => q * 2)
  }

  exPrice = computed( ()=> this.selectedProduct().price * this.quantity());
  color = computed( () => this.exPrice() > 50 ? 'green' : 'blue';
  
  e = effect(() => console.log('In effect, price: ', this.exPrice));

  onQuantitySelected(qty: number){
    this.quantity.set(qty);
  }
}

export interface Product{
  id: number;
  name: string;
  price: number;
}

bootstrapApplication(App);