import { Component, OnInit } from '@angular/core';
import { MakeService } from './../Services/make.service';
//import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  order: any[];
  clonedOrder: any[];

  tmpThisOrder: thisOrder = {
    order_Number: 0,
    address: '',
    type: '',
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

    // sorting logic
    key = 'order_Number'; // sort default by name
    reverse = false;
    sortList(key) {
      this.key = key;
      this.reverse = !this.reverse;
      console.log(this.key);
    }

  constructor(private MakeService: MakeService, private _formBuilder: FormBuilder) { }

  ngOnInit() {    
      this.MakeService.getOrder().subscribe(order => {
        this.order = order     
        this.clonedOrder = JSON.parse(JSON.stringify(this.order));
        this.clonedOrder.forEach(function (value) {
        delete value.id;
        });
      console.log(this.clonedOrder);      
      })
  } 
}


class thisOrder 
{
  order_Number: number;
  address: string;
  type: string;
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