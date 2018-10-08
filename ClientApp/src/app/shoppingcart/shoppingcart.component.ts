import { ShoppingcartService } from './../Services/shoppingcart.service';
import { Component, OnInit } from '@angular/core';
import { thisOrder } from './../Models/interfaces'


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(private ShoppingcartServiceService: ShoppingcartService) { }

  // shoppingOrder: thisOrder[] = [];
  shoppingOrder: any = {};

  ngOnInit() {
    this.shoppingOrder = this.ShoppingcartServiceService.get();
  }
  

  click()
  {
    console.log(this.shoppingOrder);
  }
}

