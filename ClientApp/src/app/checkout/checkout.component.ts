import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ShoppingcartService } from '../Services/shoppingcart.service';
import { MatSnackBar } from '@angular/material';
import { MakeService } from '../Services/make.service';
import { AuthService } from '../Services/auth.service';
import { ThisOrder, OrderWDate } from '../Models/interfaces';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // Variables
  total_price = 0;
  finalAmount = 1;
  addressValue = '';
  stateValue = '';
  zipCodeValue = '';
  lastOrderNumber: string[];
  order_Number = '';

  // Objects
  shoppingOrder: any = {};
  tmpObject: ThisOrder = {
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
  order: any;

  constructor(
      private router: Router,
      private ShoppingcartServices: ShoppingcartService,
      public snackBar: MatSnackBar,
      private makeService: MakeService,
      public auth: AuthService
  ) {}

  ngOnInit() {
      if (!this.auth.isAuthenticated()) {
          this.router.navigate(['/home']);
      }
      this.shoppingOrder = this.ShoppingcartServices.Get();
      for (const tmp in this.shoppingOrder) {
         if (this.shoppingOrder.hasOwnProperty(tmp)) {
           this.total_price = this.total_price + parseInt(this.shoppingOrder[tmp].total_Price, 10);         }
      }
   }

   submit() {
        this.tmpObject = this.shoppingOrder;
        this.tmpObject.address = this.addressValue;
        this.tmpObject.state = this.stateValue;
        this.tmpObject.zipCode = this.zipCodeValue;
        this.makeService.GetOrder().subscribe( x => {
            console.log('this.tmpObject', x[x.length - 1]);
            this.tmpObject.order_Number = (Math.floor(Math.random() * 9999999) +  x[x.length - 1].order_Number.toString());
            console.log('this.tmpObject', this.tmpObject.order_Number);
            this.makeService.CreateOrder(this.tmpObject).subscribe();
            console.log(this.lastOrderNumber);
        });
    }

  OpenSnackbar() {
      this.snackBar.openFromComponent(OrderCompleteSnackComponent, {
          duration: 5000,
      });
  }
}
// End Checkout Component

// Completion Popup
@Component({
    selector: 'app-order-complete-snack',
    templateUrl: 'OrderCompleteSnack.html',
    styles: [`
        .OrderMessage {
            color: Green;
        }
    `],
})
export class OrderCompleteSnackComponent {}
