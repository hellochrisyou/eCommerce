import { MakeService } from './../Services/make.service';
import { ShoppingcartService } from './../Services/shoppingcart.service';
import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  shoppingOrder: any = {};

  //Sorting Logic
  key = 'order_Number'; // sort default by name
  reverse = false;
  sortList(key) {
      this.key = key;
      this.reverse = !this.reverse;
  }

  constructor(
      private ShoppingcartService: ShoppingcartService,
      public snackBar: MatSnackBar,
      private makeService: MakeService,
      public auth: AuthService,
      private router: Router
  ) {}

  ngOnInit() {
      if (!this.auth.isAuthenticated()) {
          this.router.navigate(['/home']);
      }
      this.shoppingOrder = this.ShoppingcartService.get();
  }

  DeleteOrder(index) {
      this.ShoppingcartService.delete(index);
  }

  submit() {
      this.router.navigate(['/checkout']);
  }
}