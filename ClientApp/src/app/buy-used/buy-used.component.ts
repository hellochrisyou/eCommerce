 import { Component, OnInit, Inject } from '@angular/core';
 import { MakeService } from './../Services/make.service';
 import { ShoppingcartService } from './../Services/shoppingcart.service';
 import { PhotoService } from '../Services/photo.service';
 import { ThisOrder } from '../Models/interfaces';
 import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
 import { AuthService } from '../Services/auth.service';
 import { Router } from '@angular/router';
 
 @Component({
  selector: 'app-buy-used',
  templateUrl: './buy-used.component.html',
  styleUrls: ['./buy-used.component.css']
})
export class BuyUsedComponent implements OnInit {
  //Variables
  selectedItems: any;
  selection: any;
  tmpSelect: string = '';
  tmpSelectedFileName: string;
  isAdmin: string = '';
  tmpShoppingOrder: ThisOrder;

  //Arrays
  collectionPhotos: any[] = [];
  allUsedItems: any[];
  myUsedItems: any[];
  photos: any[];
  radioSelection: string[] = ['All items', "My items"];

  //Objects
  tmpThisOrder: ThisOrder = {
      type: 'Used',
      address: '',
      state: '',
      zipCode: '',
      accountInfoOrderId: '',
      order_Number: '',
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

  constructor(
      private router: Router,
      private Auth: AuthService,
      public UsedSnackBar: MatSnackBar,
      public dialog: MatDialog,
      private shoppingcart: ShoppingcartService,
      private MakeService: MakeService,
      private photoService: PhotoService
  ) {}

  ngOnInit() {
      if (!this.Auth.isAuthenticated()) {
          this.router.navigate(['/home']);
      }
      this.tmpSelect = '';
      this.serviceGet();
  }

  serviceGet() {
      var accountId = localStorage.getItem('account_id');
      this.isAdmin = localStorage.getItem('isAdmin');
      this.MakeService.getAllSaleItem().subscribe(usedItem => {
          this.allUsedItems = usedItem

          this.allUsedItems.forEach(element => {
              this.photoService.getPhotos(element.id)
                  .subscribe(photo => {
                      this.collectionPhotos.push(photo);
                  });
          });
          this.myUsedItems = this.allUsedItems
              .filter(
                  function(e) {
                      if (e.accountSaleItemId == accountId) {
                          return e;
                      }
                  }
              );
          this.filterItems(this.tmpSelect);
      });
  }

  DeleteItem(index) {
      if (this.tmpSelect === 'My items') {
          this.MakeService.deleteUsed(this.myUsedItems[index].id).subscribe(x => {
              x;
              this.serviceGet();
              this.filterItems('My items');
          });;
      } else {
          this.MakeService.deleteUsed(this.allUsedItems[index].id).subscribe(x => {
              x;
              this.serviceGet();
              this.filterItems('All items');
          });
      }
  }

  addToCart(i) {
      this.openUsedSnackBar();
      this.tmpThisOrder = this.allUsedItems[i];
      this.tmpThisOrder.total_Price = this.tmpThisOrder.total_Price.toString();
      this.shoppingcart.add(this.tmpThisOrder);
  }

  openDialog(selectedPic): void {
      this.tmpSelectedFileName = selectedPic.fileName;
      const dialogRef = this.dialog.open(ExpandPic, {
          width: '300px',
          height: '300px',
          data: {
              expandedPic: this.tmpSelectedFileName
          }
      });
  }

  openUsedSnackBar() {
      this.UsedSnackBar.openFromComponent(ConfirmUsedItem, {
          duration: 5000,
      });
  }

  filterItems(selection) {
      if (selection === 'All items') {
          this.selectedItems = this.allUsedItems;
          this.tmpSelect = 'All items';
      } else if (selection === 'My items') {
          this.selectedItems = this.myUsedItems;
          this.tmpSelect = 'My items';
      }
  }
}
//End Buy-Used Component

//Confirm Dialog
@Component({
  selector: 'ConfirmUsedItem',
  templateUrl: 'ConfirmUsedItem.html',
  styles: [`
  .confirmMessage {
    color: green;      
  }
`],
})
export class ConfirmUsedItem {}

class PhotoClass {
  expandedPic: string;
}

//Expand Picture Popup
@Component({
  selector: 'expandPic',
  templateUrl: 'expandPic.html',
  styles: [`  
  .picSize{
    width:90%;
    height:auto;     
`],
})
export class ExpandPic {
  constructor(
      public dialogRef: MatDialogRef < ExpandPic > ,
      @Inject(MAT_DIALOG_DATA) public data: PhotoClass) {}

  done(): void {

      this.dialogRef.close();
  }
}