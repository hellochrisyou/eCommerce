 import { AuthService } from './../Services/auth.service';
 import { PhotoService } from './../Services/photo.service';
 import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
 import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 import { MakeService } from './../Services/make.service';
 import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
 import { ThisSellOrder } from '../Models/interfaces';
 import { Router } from '@angular/router';

 @Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
    // Variables
    uploadedItemId = 0;
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

    // Arrays
    uploadedItem: any[];

    // Objects
    tmpThisOrder: ThisSellOrder = {
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

    constructor(
        private router: Router,
        public snackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
        private MakeServices: MakeService,
        public dialog: MatDialog,
        private Auth: AuthService,
    ) {}

    ngOnInit() {
        if (!this.Auth.isAuthenticated()) {
            this.router.navigate(['/home']);
        }
        // Initialize accountId
        this.tmpThisOrder.accountsaleitemid = localStorage.getItem('account_id');

        // Initialize Form Groups
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

    Submit() {
        console.log('1');
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

        // Reset Fields
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

        // Create Service Call
        this.MakeServices.CreateSaleItem(this.tmpThisOrder).subscribe(x => {
            this.MakeServices.GetAllSaleItem().subscribe(uploadedItem => {
                this.uploadedItem = uploadedItem;
                const lastItem = this.uploadedItem.pop();
                this.uploadedItemId = lastItem.id;
                // Prompt Upload Picture
                this.OpenDialog();
                this.tmpThisOrder = {
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

    OpenDialog(): void {
        const dialogRef = this.dialog.open(UploadDialogComponent, {
            width: '250px',
            data: {
                itemId: this.uploadedItemId
            }
        });
    }
}
// End Sell Component

// Upload Picture Dialog
@Component({
  selector: 'app-upload-dialog',
  templateUrl: 'UploadDialog.html',
})

export class UploadDialogComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    // Variables
    count = 0;
    photos: any[];
    progress: any;

    constructor(
        private photoServices: PhotoService,
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef < UploadDialogComponent > ,
        @Inject(MAT_DIALOG_DATA) public itemObject: UploadedItemId) {}

    ngOnInit() {
        this.photoServices.GetPhotos(this.itemObject.itemId).subscribe(photos => {
            this.photos = photos;
        });
    }

    UploadPhoto() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this.photoServices.Upload(this.itemObject.itemId, nativeElement.files[0])
            .subscribe(photo => {
                    this.photos.push(photo);
                    this.count = this.count + 1;
                },
                err => {
                    this.OpenSnackbar();
                }
            );
    }

    OpenSnackbar() {
        this.snackBar.openFromComponent(SnackErrorMessageComponent, {
            duration: 5000,
        });
    }

    Done(): void {
        this.dialogRef.close();
    }
}

// Error Popup
@Component({
    selector: 'app-snack-error-message',
    templateUrl: 'snackErrorMessage.html',
    styles: [`
        .errorMessage {
            color: red;
        }
    `],
})
export class SnackErrorMessageComponent {}

interface UploadedItemId {
  itemId: number;
}
