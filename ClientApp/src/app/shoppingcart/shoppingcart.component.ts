import { MakeService } from './../Services/make.service';
import { ShoppingcartService } from './../Services/shoppingcart.service';
import { Component, OnInit, Inject } from '@angular/core';
import { thisOrder } from './../Models/interfaces'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(public dialog: MatDialog, private ShoppingcartService: ShoppingcartService) { }

  // shoppingOrder: thisOrder[] = [];
  shoppingOrder: any = {};
  
  

  ngOnInit() {
    this.shoppingOrder = this.ShoppingcartService.get();
  }
  
  DeleteOrder(index) {
    console.log('index', index);
    this.ShoppingcartService.delete(index);
  }
  submit()  {    
    this.openDialog();
  }
      
  openDialog(): void {    
    const dialogRef = this.dialog.open(checkout, {
      width: '650px',
      height: '650px',
      data: this.shoppingOrder
    });
    }
}

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html',
  styles: [`
    .dialog-container {
      display: flex;
      flex-direction: column;
    }
    
    .dialog-container > * {
      width: 100%;
    }   
  `],
})
export class checkout {
  constructor(private makeService: MakeService, public auth: AuthService,
    public dialogRef: MatDialogRef<checkout>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}    
    addressValue: string;

    tmpObject: thisOrder = {
      order_Number: '1',
      type: 'Used',
      address: 'aa',
      AccountInfoOrderId: '',
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

    submit(): void {
      console.log('address', this.addressValue);
      console.log('math', (Math.floor((Math.random() * 999999) + 1000000)));

      for (var tmp in this.data) {
        this.tmpObject.address = this.addressValue;
        this.tmpObject.order_Number=Math.floor((Math.random() * 999999) + 1000000).toString();         
        this.tmpObject.AccountInfoOrderId= localStorage.getItem('account_id');
        this.tmpObject.case = this.data[tmp].case;
        this.tmpObject.cooling_Fan = this.data[tmp].cooling_Fan;
        this.tmpObject.cpu = this.data[tmp].cpu;
        this.tmpObject.gpu = this.data[tmp].gpu;
        this.tmpObject.motherboard = this.data[tmp].motherboard;
        this.tmpObject.power_Supply = this.data[tmp].power_Supply;
        this.tmpObject.ram = this.data[tmp].ram;
        this.tmpObject.storage = this.data[tmp].storage;
        this.tmpObject.total_Price = this.data[tmp].total_Price;
        this.tmpObject.type = this.data[tmp].type;
        console.log('this.tmpobject', this.tmpObject);
    this.makeService.createOrder(this.tmpObject).subscribe(x => x)    
  };
    }
    cancel(): void {
      this.dialogRef.close();
    }
}


