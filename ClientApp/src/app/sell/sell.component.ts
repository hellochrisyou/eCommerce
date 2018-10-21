import { AuthService } from './../Services/auth.service';
import { PhotoService } from './../Services/photo.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MakeService } from './../Services/make.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {ErrorHandler} from "@angular/core";
import { thisSellOrder } from '../Models/interfaces';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  uploadedItem: any[];
  uploadedItemId: number = 0;

  

  tmpThisOrder: thisSellOrder = {
    accountsaleitemid: '',    
    type: 'Used',
    case: '',
    cooling_Fan: '',
    cpu: '',
    gpu: '',
    motherboard: '',
    power_Supply: '',
    ram: '',
    storage: '',   
    total_Price: '',
    sellerName: 'test'
  }
  
  isLinear = false;
  sellerNameFormGroup: FormGroup;
  cpuFormGroup: FormGroup;
  secondFormGroup: FormGroup;  
  motherboardFormGroup: FormGroup;
  ramFormGroup: FormGroup;
  storageFormGroup: FormGroup;
  gpuFormGroup: FormGroup;
  powerFormGroup: FormGroup;
  coolingFormGroup: FormGroup;
  caseFormGroup: FormGroup;
  priceFormGroup: FormGroup;
  


  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,  
    private MakeService: MakeService, 
    private photoService: PhotoService,
    public dialog: MatDialog,
    private Auth: AuthService,
    ) 
    {
    }

  ngOnInit() {
    if (!this.Auth.isAuthenticated())
        {
          this.router.navigate(['/home']);
        }
    //initialize accountId
    this.tmpThisOrder.accountsaleitemid = localStorage.getItem('account_id');

    //initialize form groups
    this.sellerNameFormGroup = this._formBuilder.group({
      sellerNameCtrl: ['', Validators.required]
    });
    this.cpuFormGroup = this._formBuilder.group({
      cpuCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.motherboardFormGroup = this._formBuilder.group({
      motherboardCtrl: ['', Validators.required]
    });
    this.ramFormGroup = this._formBuilder.group({
      ramCtrl: ['', Validators.required]
    });
    this.storageFormGroup = this._formBuilder.group({
      storageCtrl: ['', Validators.required]
    });
    this.gpuFormGroup = this._formBuilder.group({
      gpuCtrl: ['', Validators.required]
    });
    this.powerFormGroup = this._formBuilder.group({
      powerCtrl: ['', Validators.required]
    });
    this.coolingFormGroup = this._formBuilder.group({
      coolingCtrl: ['', Validators.required]
    });
    this.caseFormGroup = this._formBuilder.group({
      caseCtrl: ['', Validators.required]
    });
    this.priceFormGroup = this._formBuilder.group({
      priceCtrl: [0, Validators.required]
    });    

  }

  submit()
  {
    this.tmpThisOrder.sellerName = this.sellerNameFormGroup.value.sellerNameCtrl;
    this.tmpThisOrder.case = this.caseFormGroup.value.caseCtrl;
    this.tmpThisOrder.cooling_Fan = this.coolingFormGroup.value.coolingCtrl;
    this.tmpThisOrder.cpu = this.cpuFormGroup.value.cpuCtrl;
    this.tmpThisOrder.gpu = this.gpuFormGroup.value.gpuCtrl;
    this.tmpThisOrder.motherboard = this.motherboardFormGroup.value.motherboardCtrl;
    this.tmpThisOrder.power_Supply = this.powerFormGroup.value.powerCtrl;
    this.tmpThisOrder.ram = this.ramFormGroup.value.ramCtrl;
    this.tmpThisOrder.storage = this.storageFormGroup.value.storageCtrl;
    this.tmpThisOrder.total_Price = this.priceFormGroup.value.priceCtrl.toString();    

    this.sellerNameFormGroup.reset();
    this.cpuFormGroup.reset();
    this.motherboardFormGroup.reset();
    this.ramFormGroup.reset();
    this.storageFormGroup.reset();
    this.gpuFormGroup.reset();
    this.powerFormGroup.reset();
    this.caseFormGroup.reset();
    this.coolingFormGroup.reset();
    this.priceFormGroup.reset();
    this.MakeService.createSaleItem(this.tmpThisOrder).subscribe(x => {
      this.MakeService.getAllSaleItem().subscribe(uploadedItem => {
        // this.uploadedItem = uploadedItem;
        // var lastItem = this.uploadedItem.pop();
        //   this.uploadedItemId = lastItem.id;
        //   console.log("uploadeditemid", this.uploadedItemId)
        //   this.openDialog();
          this.tmpThisOrder =  {
            accountsaleitemid: '',    
            type: 'Used',
            case: '',
            cooling_Fan: '',
            cpu: '',
            gpu: '',
            motherboard: '',
            power_Supply: '',
            ram: '',
            storage: '',   
            total_Price: '',
            sellerName: 'test'
          };
          this.tmpThisOrder.accountsaleitemid = localStorage.getItem('account_id');
          this.priceFormGroup.get('priceCtrl').setValue(0);
          });   
    });    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadDialog, {
      width: '250px',
      data: {itemId: this.uploadedItemId}
    });
  }
  
}

@Component({
  selector: 'UploadDialog',
  templateUrl: 'UploadDialog.html',
})

export class UploadDialog{
  count: number = 0;
  @ViewChild('fileInput')fileInput: ElementRef;
  photos: any[];
  progress: any;

  constructor(
    private photoService: PhotoService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UploadDialog>,
    @Inject(MAT_DIALOG_DATA) public itemObject: uploadedItemId) {}

    ngOnInit() {
      this.photoService.getPhotos(this.itemObject.itemId).subscribe(photos => 
        {
          this.photos = photos          
        });
    }

    uploadPhoto()
    {
      var nativeElement: HTMLInputElement = this.fileInput.nativeElement;  
      this.photoService.upload(this.itemObject.itemId, nativeElement.files[0])
        .subscribe(photo => {
          this.photos.push(photo);
          this.count = this.count + 1;
        },
        err => {
          this.openSnackBar();
        }
        );
    }    

    openSnackBar() {
      this.snackBar.openFromComponent(snackErrorMessage, {
        duration: 5000,
      });
    }

    done(): void {
      this.dialogRef.close();
    }
}

@Component({
  selector: 'snackErrorMessage',
  templateUrl: 'snackErrorMessage.html',
  styles: [`
    .errorMessage {
      color: red;      
    }
  `],
})
export class snackErrorMessage {}

interface uploadedItemId {
  itemId: number;
}

