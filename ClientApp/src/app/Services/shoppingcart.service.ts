import { Injectable } from '@angular/core';
import { thisOrder } from './../Models/interfaces'

@Injectable({
  providedIn: 'root'
 })
 export class ShoppingcartService {
  //Arrays
  tmpArray: thisOrder[] = [];

  //Objects
  tmpThisOrder: shoppingthisOrder = {
   type: '',
   address: '',
   state: '',
   zipCode: '',
   accountInfoOrderId: '',
   order_Number: '',
   case: '',
   cooling_Fan: '',
   cpu: '',
   gpu: '',
   motherboard: '',
   power_Supply: '',
   ram: '',
   storage: '',
   total_Price: ''
  }
 
  //Sorting Logic
  key = 'order_Number'; // Sort Default by Name
  reverse = false;
  sortList(key) {
   this.key = key;
   this.reverse = !this.reverse;
  }
 
  constructor() {}
 
  add(tmpOrder) {
   this.tmpThisOrder = tmpOrder;
   this.tmpArray.push(this.tmpThisOrder);
  }
  delete(index) {
   this.tmpArray.splice(index, 1);
  }
  get() {
   return this.tmpArray;
  }
 }
 //End Shoppingcart Service

 //Classes
 class shoppingthisOrder {
  type: string;
  address: string;
  state: string;
  zipCode: string;
  accountInfoOrderId: string;
  order_Number: string;
  case :string;
  cooling_Fan:
   string;
   cpu: string;
   gpu: string;
   motherboard: string;
   power_Supply: string;
   ram: string;
   storage: string;
   total_Price: string;
 }