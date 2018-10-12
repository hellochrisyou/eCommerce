import { Component, OnInit, Inject } from '@angular/core';
import { MakeService } from './../Services/make.service';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { ShoppingcartService } from './../Services/shoppingcart.service';
import { PhotoService } from '../Services/photo.service';
import { thisOrder } from '../Models/interfaces';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { AuthService } from '../Services/auth.service';

@Component({
 selector: 'app-buy-used',
 templateUrl: './buy-used.component.html',
 styleUrls: ['./buy-used.component.css']
})
export class BuyUsedComponent implements OnInit {
 selectedItems: any = {};
 radioSelection: string[] = ['All items', "My items"];
 photos: any[];
 tmpSelectedFileName: string;
 collectionPhotos: any[] = [];
 allUsedItems: any[];
 myUsedItems: any[];
 //temporary object for practice.  use ng init to cycle through items
 tmpThisOrder: thisOrder = { 
     type: 'Used',
     address: '',
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

 tmpShoppingOrder: thisOrder;

 constructor(
  private Auth: AuthService,
  public UsedSnackBar: MatSnackBar,
  public dialog: MatDialog, 
  private shoppingcart: ShoppingcartService, 
  private MakeService: MakeService, 
  private photoService: PhotoService
  ) {}

 ngOnInit() {
  var accountId = localStorage.getItem('account_id');
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
          console.log(e);
          if (e.accountSaleItemId == accountId)             
          {            
            return e;              
          }
        }
      );
     this.selectedItems = this.allUsedItems;
   });   
 } 

 addToCart(i)
 {
   this.openUsedSnackBar();
   console.log('index', i);
   this.tmpThisOrder = this.allUsedItems[i];
   this.tmpThisOrder.total_Price = this.tmpThisOrder.total_Price.toString();
   console.log('tmpthisorder', this.tmpThisOrder);
   this.shoppingcart.add(this.tmpThisOrder);      
 }

 openDialog(selectedPic): void {
   this.tmpSelectedFileName = selectedPic.fileName;
   console.log(selectedPic.fileName);
  const dialogRef = this.dialog.open(expandPic, {
    width: '450px',
    height: '350px',
    data: {expandedPic: this.tmpSelectedFileName}
  });
  }

  openUsedSnackBar() {
    this.UsedSnackBar.openFromComponent(ConfirmUsedItem, {
      duration: 5000,
    });
  }

  filterItems(selection)
  {
 
    if (selection == 'All items')
    {
      this.selectedItems = this.allUsedItems;
      console.log('all items', this.selectedItems);
    }
    else{
      this.selectedItems = this.myUsedItems;
      console.log('my items', this.selectedItems);
    }
  }
}

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


@Component({
  selector: 'expandPic',
  templateUrl: 'expandPic.html',
  styles: [`
    .picSize {
      height: 100%;
      width: 100%;      
    }
  `],
})
export class expandPic {
  constructor(    
    public dialogRef: MatDialogRef<expandPic>,
    @Inject(MAT_DIALOG_DATA) public data: photoClass) {}

    done(): void {
      
      this.dialogRef.close();      
    }
    
}

class photoClass {
  expandedPic: string;
}

