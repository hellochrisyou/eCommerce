import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { thisOrder } from './../Models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  tmpArray: thisOrder[] = [];
  tmpThisOrder: shoppingthisOrder = {
    type: '',
    address: '',
    AccountInfoOrderId: '',
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

  constructor() { }
  
  add(tmpOrder)
  {
    this.tmpThisOrder = tmpOrder;
    this.tmpArray.push(this.tmpThisOrder);
    console.log(this.tmpArray);
  }
  delete(index)
  {
    console.log('finished splice', this.tmpArray);
    this.tmpArray.splice(index,1);
    console.log('finished splice', this.tmpArray);
  }
  get() 
  {
    return this.tmpArray;
  }  
}
class shoppingthisOrder {
  type: string;
  address: string;
  AccountInfoOrderId: string;
  order_Number: string;
  case: string;
  cooling_Fan: string;
  cpu: string;
  gpu: string;
  motherboard: string;
  power_Supply: string;
  ram: string;
  storage: string;
  total_Price: string;
}