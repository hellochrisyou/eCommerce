import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { thisOrder } from './../Models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  tmpArray: thisOrder[] = [];
  tmpThisOrder: thisOrder = {
    type: '',
    case: '',
    cooling_Fan: '',
    cpu: '',
    gpu: '',
    motherboard: '',
    power_Supply: '',
    ram: '',
    storage: '',
    total_Price: 0       
  }

  constructor() { }

  add(tmpOrder)
  {
    this.tmpThisOrder = tmpOrder;
    this.tmpArray.push(this.tmpThisOrder);
    console.log(this.tmpArray);
  }

  get() 
  {
    return this.tmpArray;
  }
}
