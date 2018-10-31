import { Injectable } from '@angular/core';
import { ThisOrder } from './../Models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  //Arrays
  tmpArray: ThisOrder[] = [];

  //Objects
  tmpThisOrder: ShoppingthisOrder = {
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
  SortList(key) {
      this.key = key;
      this.reverse = !this.reverse;
  }

  constructor() {}

  Add(tmpOrder) {
      this.tmpThisOrder = tmpOrder;
      this.tmpArray.push(this.tmpThisOrder);
  }
  Delete(index) {
      this.tmpArray.splice(index, 1);
  }
  Get() {
      return this.tmpArray;
  }
}
//End Shoppingcart Service

//Classes
class ShoppingthisOrder {
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