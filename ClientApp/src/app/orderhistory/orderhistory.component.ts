import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MakeService } from './../Services/make.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThisOrder, KeyValuePair, OrderWDate} from './../Models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
    // Variables
    order: any;

    // Objects
    clonedOrder: any = {};
    tmpThisOrder: OrderWDate = {
        type: 'New',
        address: '',
        state: '',
        zipCode: '',
        accountInfoOrderId: '',
        order_Number: '',
        orderDate: '',
        case: '',
        cooling_Fan: '',
        cpu: '',
        gpu: '',
        motherboard: '',
        power_Supply: '',
        ram: '',
        storage: '',
        total_Price: '11'
    };

    // Sorting Logic
    key = 'order_Number'; // sort default by name
    reverse = false;
    SortList(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(
        private router: Router,
        private Auth: AuthService,
        private MakeServices: MakeService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        if (!this.Auth.isAuthenticated()) {
            this.router.navigate(['/home']);
        }
        const accountId = localStorage.getItem('account_id');
        this.MakeServices.GetOrder().subscribe(order => {
            this.order = order;
            this.clonedOrder = JSON.parse(JSON.stringify(this.order
                .filter(
                    function(e) {
                        if (e.accountInfoOrderId == accountId) {
                            return e;
                        }
                    }
                )));

            this.clonedOrder.forEach(function(value, index, object) {
                delete value.id;
            });
        });
    }
}
