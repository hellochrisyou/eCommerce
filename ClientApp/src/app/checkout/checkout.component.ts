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
    p: any;
    key = 'order_Number'; // sort default by name
    reverse = false;
    total_price = 0;
    finalAmount = 1;
    addressValue = '';
    stateValue = '';
    zipCodeValue = '';
    lastOrderNumber = 0;
    order_Number = '';
    accountId: string;

    // Objects
    shoppingOrder: any = {};
    tmpObject: ThisOrder = {
        order_Number: '1',
        type: 'Used',
        address: '',
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
        total_Price: '',
    };
    order: any;

    SortList(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

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
                this.total_price = this.total_price + parseInt(this.shoppingOrder[tmp].total_Price, 10);
            }
        }
        this.accountId = localStorage.getItem('account_id');
    }

    submit() {
        this.makeService.GetOrder().subscribe(x => {
            this.lastOrderNumber = x[x.length - 1].order_Number;
            for (const tmp in this.shoppingOrder) {
                if (this.shoppingOrder.hasOwnProperty(tmp)) {
                    this.lastOrderNumber++;
                    console.log(this.lastOrderNumber);
                    this.tmpObject.order_Number = this.lastOrderNumber.toString();
                    this.tmpObject.type = this.shoppingOrder[tmp].type.toString();
                    this.tmpObject.address = this.addressValue.toString();
                    this.tmpObject.state = this.stateValue.toString();
                    this.tmpObject.zipCode = this.zipCodeValue.toString();
                    this.tmpObject.accountInfoOrderId = this.accountId.toString();
                    this.tmpObject.case = this.shoppingOrder[tmp].case.toString();
                    this.tmpObject.cooling_Fan = this.shoppingOrder[tmp].cooling_Fan.toString();
                    this.tmpObject.cpu = this.shoppingOrder[tmp].cpu.toString();
                    this.tmpObject.gpu = this.shoppingOrder[tmp].gpu.toString();
                    this.tmpObject.motherboard = this.shoppingOrder[tmp].motherboard.toString();
                    this.tmpObject.power_Supply = this.shoppingOrder[tmp].power_Supply.toString();
                    this.tmpObject.ram = this.shoppingOrder[tmp].ram.toString();
                    this.tmpObject.storage = this.shoppingOrder[tmp].storage.toString();
                    this.tmpObject.total_Price = this.shoppingOrder[tmp].total_Price.toString();
                    this.makeService.CreateOrder(this.tmpObject).subscribe();
                }
            }
        });
        this.OpenSnackbar();
        this.ShoppingcartServices.Clear();
        this.router.navigate(['/home']);
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
