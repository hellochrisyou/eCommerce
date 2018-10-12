import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MakeService } from './../Services/make.service';
//import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { thisOrder, KeyValuePair, orderWDate} from './../Models/interfaces'

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  order: any[];
  clonedOrder: any[];

  tmpThisOrder: orderWDate = {
    type: 'New',
    address: '',
    accountInfoOrderId: '',
    order_Number: '',
    orderDate: new Date("January 1, 2018 00:00:00"),
    case: '',
    cooling_Fan: '',
    cpu: '',
    gpu: '',
    motherboard: '',
    power_Supply: '',
    ram: '',
    storage: '',
    total_Price: '11'       
    }

    // sorting logic
    key = 'order_Number'; // sort default by name
    reverse = false;
    sortList(key) {
      this.key = key;
      this.reverse = !this.reverse;
      console.log(this.key);
    }

  constructor(
    private Auth: AuthService, 
    private MakeService: MakeService, 
    private _formBuilder: FormBuilder
    ) { }

  ngOnInit() {        
    var accountId = localStorage.getItem('account_id');
    console.log('accountId', accountId);
      this.MakeService.getOrder().subscribe(order => {
        this.order = order;
        this.clonedOrder = JSON.parse(JSON.stringify(this.order
          .filter(
            function(e) {
              console.log(e);
              if (e.accountInfoOrderId == accountId)             
              {
                
                return e;              
              }
            }
          )));
        
        this.clonedOrder.forEach(function (value, index, object) {
        delete value.id;        
        });
      console.log(this.clonedOrder);    
    })
  } 
}



