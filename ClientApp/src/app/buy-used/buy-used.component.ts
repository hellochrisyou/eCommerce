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
  // Variables
  selectedItems: any;
  selection: any;
  tmpSelect = '';
  tmpSelectedFileName: string;
  IsAdmin = '';
  tmpShoppingOrder: ThisOrder;

  // Arrays
  collectionPhotos: any[] = [];
  allUsedItems: any[];
  myUsedItems: any[];
  photos: any[];
  radioSelection: string[] = ['All items', 'My items'];

  // Objects
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
  };

  constructor(
      private router: Router,
      private Auth: AuthService,
      public usedSnackBar: MatSnackBar,
      public deleteUsedSnackBar: MatSnackBar,
      public dialog: MatDialog,
      private shoppingcart: ShoppingcartService,
      private MakeServices: MakeService,
      private photoService: PhotoService
  ) {}

  ngOnInit() {
      if (!this.Auth.isAuthenticated()) {
          this.router.navigate(['/home']);
      }
      this.tmpSelect = '';
      this.GetService();
  }

  GetService() {
      const accountId = localStorage.getItem('account_id');
      this.IsAdmin = localStorage.getItem('IsAdmin');
      this.MakeServices.GetAllSaleItem().subscribe(usedItem => {
          this.allUsedItems = usedItem;

        //   this.allUsedItems.forEach(element => {
        //       this.photoService.GetPhotos(element.id)
        //           .subscribe(photo => {
        //               this.collectionPhotos.push(photo);
        //           });
        //   });
          this.myUsedItems = this.allUsedItems
              .filter(
                  function(e) {
                      if (e.accountSaleItemId == accountId) {
                          return e;
                      }
                  }
              );
          this.FilterItems(this.tmpSelect);
      });
  }

  DeleteItem(index) {
      if (this.tmpSelect == 'My items') {
        this.MakeServices.DeleteUsed(this.myUsedItems[index].id).subscribe(y => {
            this.DeleteUsedSnackBar();
            this.GetService();
            this.FilterItems('My items');
          });
        //   this.MakeServices.DeletePhoto(this.myUsedItems[index].id).subscribe(x => {
        //       this.MakeServices.DeleteUsed(this.myUsedItems[index].id).subscribe(y => {
        //         this.DeleteUsedSnackBar();
        //         this.GetService();
        //         this.FilterItems('My items');
        //       });
        //   });
      } else {
        this.MakeServices.DeleteUsed(this.allUsedItems[index].id).subscribe(y => {
            this.DeleteUsedSnackBar();
            this.GetService();
            this.FilterItems('My items');
          });
        //   this.MakeServices.DeletePhoto(this.allUsedItems[index].id).subscribe(x => {
        //       this.MakeServices.DeleteUsed(this.allUsedItems[index].id).subscribe(y => {
        //         this.DeleteUsedSnackBar();
        //         this.GetService();
        //         this.FilterItems('My items');
        //       });
        //   });
      }
  }

  AddToCart(i) {
      this.OpenSnackbar();
      this.tmpThisOrder = this.allUsedItems[i];
      this.tmpThisOrder.total_Price = this.tmpThisOrder.total_Price.toString();
      this.shoppingcart.Add(this.tmpThisOrder);
  }

  OpenDialog(selectedPic): void {
      this.tmpSelectedFileName = selectedPic.fileName;
      const dialogRef = this.dialog.open(ExpandPicComponent, {
          width: '300px',
          height: '300px',
          data: {
              expandedPic: this.tmpSelectedFileName
          }
      });
  }

  DeleteUsedSnackBar(): void {
    this.deleteUsedSnackBar.openFromComponent(ConfirmDeleteUsedComponent, {
        duration: 5000,
    });
  }

  OpenSnackbar() {
      this.usedSnackBar.openFromComponent(ConfirmUsedItemComponent, {
          duration: 5000,
      });
  }

  FilterItems(selection) {
      if (selection == 'All items') {
          this.selectedItems = this.allUsedItems;
          this.tmpSelect = 'All items';
      } else if (selection == 'My items') {
          this.selectedItems = this.myUsedItems;
          this.tmpSelect = 'My items';
      }
  }
}
// End Buy-Used Component

// Confirm Dialog
@Component({
  selector: 'app-confirm-used-item',
  templateUrl: 'ConfirmUsedItem.html',
  styles: [`
  .confirmMessage {
    color: green;
  }
`],
})
export class ConfirmUsedItemComponent {}

class PhotoClass {
  expandedPic: string;
}

// Expand Picture Popup
@Component({
  selector: 'app-expand-pic',
  templateUrl: 'expandPic.html',
  styles: [`
  .picSize{
    width:90%;
    height:auto;
`],
})
export class ExpandPicComponent {
  constructor(
      public dialogRef: MatDialogRef < ExpandPicComponent > ,
      @Inject(MAT_DIALOG_DATA) public data: PhotoClass) {}

  done(): void {

      this.dialogRef.close();
  }
}

// Confirm Delete
@Component({
    selector: 'app-confirm-delete-used',
    templateUrl: 'ConfirmUsedItem.html',
    styles: [`
    .confirmMessage {
      color: red;
    }
  `],
  })
  export class ConfirmDeleteUsedComponent {}
