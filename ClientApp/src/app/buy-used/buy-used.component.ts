import { Component, OnInit, Inject } from '@angular/core';
import { MakeService } from './../Services/make.service';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { ShoppingcartService } from './../Services/shoppingcart.service';
import { PhotoService } from '../Services/photo.service';
import { thisOrder } from '../Models/interfaces';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
 selector: 'app-buy-used',
 templateUrl: './buy-used.component.html',
 styleUrls: ['./buy-used.component.css']
})
export class BuyUsedComponent implements OnInit {
 photos: any[];
 tmpSelectedFileName: string;
 collectionPhotos: any[] = [];
 usedItem: any[];
 //temporary object for practice.  use ng init to cycle through items
 tmpThisOrder: thisOrder = { 
     type: 'Used',
     case: '',
     cooling_Fan: '',
     cpu: '',
     gpu: '',
     motherboard: '',
     power_Supply: '',
     ram: '',
     storage: '',
     total_Price: 0  
 }

 tmpShoppingOrder: thisOrder;

 constructor(public dialog: MatDialog, private shoppingcart: ShoppingcartService, private MakeService: MakeService, private photoService: PhotoService) { }

 ngOnInit() {
   this.MakeService.getAllSaleItem().subscribe(usedItem => {
     this.usedItem = usedItem

     this.usedItem.forEach(element => {
           this.photoService.getPhotos(element.id)
           .subscribe(photo => {
             this.collectionPhotos.push(photo);
           });
     });     
   });   
 } 

 addToCart(i)
 {
   console.log('index', i);
   this.tmpThisOrder = this.usedItem[i];
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
}

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
