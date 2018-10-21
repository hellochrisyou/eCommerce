import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../Services/shoppingcart.service';
import { MatSnackBar } from '@angular/material';
import { MakeService } from '../Services/make.service';
import { AuthService } from '../Services/auth.service';
import { thisOrder } from '../Models/interfaces';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  total_price: number = 0;
  addressValue: string = '';
  stateValue: string= '';
  zipCodeValue: string= '';
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  tmpObject: thisOrder = {
    order_Number: '1',
    type: 'Used',
    address: 'aa',
    state: '',
    zipCode: '',
    accountInfoOrderId: '',
    case: '',
    cooling_Fan: '',
    cpu: '',
    gpu: '',
    motherboard: '',
    power_Supply: '',
    ram: '',
    storage: '',
    total_Price: '' 
  };

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'Af29uGTg9cTe0QxVYNu8lx89ecHuoo1uuX0fGorDfhYXJ57Uj9sHVqiYm2_IvnYf_ER39Xc-Lwbe6miY',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.total_price, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        for (var tmp in this.shoppingOrder) {
          this.tmpObject.address = this.shoppingOrder.address;
          this.tmpObject.state = this.stateValue;
          this.tmpObject.zipCode = this.shoppingOrder.zipCodeValue;
          this.tmpObject.order_Number=Math.floor((Math.random() * 999999) + 1000000).toString();         
          this.tmpObject.accountInfoOrderId= localStorage.getItem('account_id');
          this.tmpObject.case = this.shoppingOrder[tmp].case;
          this.tmpObject.cooling_Fan = this.shoppingOrder[tmp].cooling_Fan;
          this.tmpObject.cpu = this.shoppingOrder[tmp].cpu;
          this.tmpObject.gpu = this.shoppingOrder[tmp].gpu;
          this.tmpObject.motherboard = this.shoppingOrder[tmp].motherboard;
          this.tmpObject.power_Supply = this.shoppingOrder[tmp].power_Supply;
          this.tmpObject.ram = this.shoppingOrder[tmp].ram;
          this.tmpObject.storage = this.shoppingOrder[tmp].storage;
          this.tmpObject.total_Price = this.shoppingOrder[tmp].total_Price;
          this.tmpObject.type = this.shoppingOrder[tmp].type;
          this.makeService.createOrder(this.tmpObject).subscribe(x => x);
          this.openSnackBar();
          };
        })
      }
    };

  ngAfterViewChecked() {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  constructor(
    private router: Router,
    private ShoppingcartService: ShoppingcartService,
    public snackBar: MatSnackBar, 
    private makeService: MakeService, 
    public auth: AuthService
    ) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated())
        {
          this.router.navigate(['/home']);
        }
    this.shoppingOrder = this.ShoppingcartService.get();
    for (var tmp in this.shoppingOrder)
    {
        this.total_price = this.total_price + parseInt(this.shoppingOrder[tmp].total_Price, 10);
    }
    console.log('totalp', this.total_price); 
  }
  shoppingOrder: any = {};


 openSnackBar() {
    this.snackBar.openFromComponent(OrderCompleteSnack, {
      duration: 5000,
    });
  }
}    

@Component({
  selector: 'OrderCompleteSnack',
  templateUrl: 'OrderCompleteSnack.html',
  styles: [`
    .OrderMessage {
      color: Green;      
    }
  `],
})
export class OrderCompleteSnack {}