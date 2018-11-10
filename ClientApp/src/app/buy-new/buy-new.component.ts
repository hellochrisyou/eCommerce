 import { AuthService } from './../Services/auth.service';
 import { MakeService } from './../Services/make.service';
 import { ShoppingcartService } from './../Services/shoppingcart.service';
 import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 import { ThisOrder, KeyValuePair } from './../Models/interfaces';
 import { MatSnackBar } from '@angular/material';
 import { Router } from '@angular/router';

 @Component({
  selector: 'app-buy-new',
  templateUrl: './buy-new.component.html',
  styleUrls: ['./buy-new.component.css'],
  providers: [MakeService]
})
export class BuyNewComponent implements OnInit {
  // Variables
  totalPrice = 0;
  modelObject: any = {};
  account: any = {};
  name = '';

  // Form Group
  isLinear = false;
  cpuFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  motherboardFormGroup: FormGroup;
  ramFormGroup: FormGroup;
  storageFormGroup: FormGroup;
  gpuFormGroup: FormGroup;
  powerFormGroup: FormGroup;
  coolingFormGroup: FormGroup;
  caseFormGroup: FormGroup;

  // Arrays
  CPU: any[];
  motherboard: any[];
  RAM: any[];
  storage: any[];
  GPU: any[];
  powerSupply: any[];
  coolingFan: any[];
  caseItem: any[];
  clonedOrder: any[];
  order: any[];

  // tmp Components
  selectedCase: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedFan: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedCPU: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedGPU: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedMotherboard: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedPSupply: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedRAM: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  selectedStorage: KeyValuePair = {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
  };
  tmpThisOrder: ThisOrder = {
      type: 'New',
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

  // sorting logic
  key = 'order_Number'; // sort default by name
  reverse = false;
  SortList(key) {
      this.key = key;
      this.reverse = !this.reverse;
  }

  constructor(
      private auth: AuthService,
      private router: Router,
      public snackBar: MatSnackBar,
      private ShoppingcartServices: ShoppingcartService,
      private MakeServices: MakeService,
      private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
      if (!this.auth.isAuthenticated()) {
          this.router.navigate(['/home']);
      }
      // Service Call
      this.MakeServices.GetCase().subscribe(caseItem => this.caseItem = caseItem);
      this.MakeServices.GetCoolingFan().subscribe(coolingFan => this.coolingFan = coolingFan);
      this.MakeServices.GetCpu().subscribe(CPU => this.CPU = CPU);
      this.MakeServices.GetGpu().subscribe(GPU => this.GPU = GPU);
      this.MakeServices.GetMotherboard().subscribe(motherboard => this.motherboard = motherboard);
      this.MakeServices.GetPowersupply().subscribe(powerSupply => this.powerSupply = powerSupply);
      this.MakeServices.GetRam().subscribe(RAM => this.RAM = RAM);
      this.MakeServices.GetStorage().subscribe(storage => this.storage = storage);
      // Eliminate id from List
      this.MakeServices.GetOrder().subscribe(order => {
        this.order = order;
        this.clonedOrder = JSON.parse(JSON.stringify(this.order));
        this.clonedOrder.forEach(function(value) {
            delete value.id;
        });
      });
      // Initialize Form Groups
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
  }

  CalculateTotal() {
    this.totalPrice = 0;

    if (this.tmpThisOrder.cpu !== '') {
        const tmp = this.CPU.find(m => m.name == this.tmpThisOrder.cpu);
        this.selectedCPU = tmp;
        this.totalPrice = parseFloat((this.selectedCPU.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.motherboard !== '') {
        const tmp = this.motherboard.find(m => m.name == this.tmpThisOrder.motherboard);
        this.selectedMotherboard = tmp;
        this.totalPrice = parseFloat((this.selectedMotherboard.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.ram !== '') {
        const tmp = this.RAM.find(m => m.name == this.tmpThisOrder.ram);
        this.selectedRAM = tmp;
        this.totalPrice = parseFloat((this.selectedRAM.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.storage !== '') {
        const tmp = this.storage.find(m => m.name == this.tmpThisOrder.storage);
        this.selectedStorage = tmp;
        this.totalPrice = parseFloat((this.selectedStorage.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.gpu !== '') {
        const tmp = this.GPU.find(m => m.name == this.tmpThisOrder.gpu);
        this.selectedGPU = tmp;
        this.totalPrice = parseFloat((this.selectedGPU.price + this.totalPrice).toFixed(2));
    }
        if (this.tmpThisOrder.power_Supply !== '') {
        const tmp = this.powerSupply.find(m => m.name == this.tmpThisOrder.power_Supply);
        this.selectedPSupply = tmp;
        this.totalPrice = parseFloat((this.selectedPSupply.price + this.totalPrice).toFixed(2));
    }
        if (this.tmpThisOrder.cooling_Fan !== '') {
        const tmp = this.coolingFan.find(m => m.name == this.tmpThisOrder.cooling_Fan);
        this.selectedFan = tmp;
        this.totalPrice = parseFloat((this.selectedFan.price + this.totalPrice).toFixed(2));
    }
        if (this.tmpThisOrder.case !== '') {
        const tmp = this.caseItem.find(m => m.name == this.tmpThisOrder.case);
        this.selectedCase = tmp;
        this.totalPrice = parseFloat((this.selectedCase.price + this.totalPrice).toFixed(2));
    }
  }

  AddOrder() {
    this.ShoppingcartServices.Add(this.tmpThisOrder);
    this.OpenSnackbar();
  }

  OpenSnackbar() {
    this.snackBar.openFromComponent(ConfirmNewItemComponent, {
        duration: 5000,
    });
  }
}
// End Buy-New Component

// Confirmation Dialog
@Component({
    selector: 'app-confirm-new-item',
    templateUrl: 'ConfirmNewItem.html',
    styles: [`
        .confirmMessage {
        color: green;
        }
    `],
})
export class ConfirmNewItemComponent {}
