import { AuthService } from './../Services/auth.service';
import { MakeService } from './../Services/make.service';
import { ShoppingcartService } from './../Services/shoppingcart.service';
import { ShoppingcartComponent } from './../shoppingcart/shoppingcart.component';
import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { thisOrder, KeyValuePair} from './../Models/interfaces'
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-new',
  templateUrl: './buy-new.component.html',
  styleUrls: ['./buy-new.component.css'], 
  providers: [MakeService]
})
export class BuyNewComponent implements OnInit {
    totalPrice: number = 0;
    caseItem: any[];
    selectedCase: KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    coolingFan: any[];
    selectedFan : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    CPU: any[];
    selectedCPU : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    GPU: any[];
    selectedGPU : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    motherboard: any[];
    selectedMotherboard : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    powerSupply: any[];
    selectedPSupply : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    RAM: any[];
    selectedRAM : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    storage: any[];
    selectedStorage : KeyValuePair =  {
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    modelObject: any = {};  
    account: any = {};
    software: any[];
    order: any[];
    clonedOrder: any[];
    name: string = '';

    tmpThisOrder: thisOrder = {
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
    total_Price: '11'       
    }

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

    // sorting logic
    key = 'order_Number'; // sort default by name
    reverse = false;
    sortList(key) {
      this.key = key;
      this.reverse = !this.reverse;
    }
    constructor(
      private auth: AuthService,
      private router: Router,
      public snackBar: MatSnackBar,
      private ShoppingcartService: ShoppingcartService, 
      private MakeService: MakeService, 
      private _formBuilder: FormBuilder
      ) { }

    ngOnInit() {
        if (!this.auth.isAuthenticated())
        {
          this.router.navigate(['/home']);
        }
        this.MakeService.getCase().subscribe(caseItem => this.caseItem = caseItem);
        this.MakeService.getCoolingfan().subscribe(coolingFan => this.coolingFan = coolingFan);
        this.MakeService.getCPU().subscribe(CPU => this.CPU = CPU);
        this.MakeService.getGPU().subscribe(GPU => this.GPU = GPU);
        this.MakeService.getMotherboard().subscribe(motherboard => this.motherboard = motherboard);
        this.MakeService.getPowersupply().subscribe(powerSupply => this.powerSupply = powerSupply);
        this.MakeService.getRAM().subscribe(RAM => this.RAM = RAM);
        this.MakeService.getStorage().subscribe(storage => this.storage = storage);
        this.MakeService.getOrder().subscribe(order => {
          this.order = order 
          this.clonedOrder = JSON.parse(JSON.stringify(this.order));
          this.clonedOrder.forEach(function (value) {
          delete value.id;
        });        
      })       
          
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
      
  addOrder()
  {
    this.ShoppingcartService.add(this.tmpThisOrder);   
    this.openSnackBar(); 
  }
  
  openSnackBar() {
    this.snackBar.openFromComponent(ConfirmNewItem, {
      duration: 5000,
    });
  }

  calculateTotal()
  {
    this.totalPrice = 0;
    
    if (this.tmpThisOrder.cpu != '')
    {
    var tmp = this.CPU.find(m => m.name == this.tmpThisOrder.cpu);  
    this.selectedCPU = tmp
    this.totalPrice = parseFloat((this.selectedCPU.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.motherboard != '')
    {
    var tmp = this.motherboard.find(m => m.name == this.tmpThisOrder.motherboard);   
    this.selectedMotherboard = tmp;
    this.totalPrice = parseFloat((this.selectedMotherboard.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.ram != '')
    {
    var tmp = this.RAM.find(m => m.name == this.tmpThisOrder.ram);   
    this.selectedRAM = tmp;
    this.totalPrice = parseFloat((this.selectedRAM.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.storage != '')
    {
    var tmp = this.storage.find(m => m.name == this.tmpThisOrder.storage);   
    this.selectedStorage = tmp;
    this.totalPrice = parseFloat((this.selectedStorage.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.gpu != '')
    {
    var tmp = this.GPU.find(m => m.name == this.tmpThisOrder.gpu);   
    this.selectedGPU = tmp;
    this.totalPrice = parseFloat((this.selectedGPU.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.power_Supply != '')
    {
    var tmp = this.powerSupply.find(m => m.name == this.tmpThisOrder.power_Supply);   
    this.selectedPSupply = tmp;
    this.totalPrice = parseFloat((this.selectedPSupply.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.cooling_Fan != '')
    {
    var tmp = this.coolingFan.find(m => m.name == this.tmpThisOrder.cooling_Fan);   
    this.selectedFan = tmp;
    this.totalPrice = parseFloat((this.selectedFan.price + this.totalPrice).toFixed(2));
    }
    if (this.tmpThisOrder.case != '')
    {
    var tmp = this.caseItem.find(m => m.name == this.tmpThisOrder.case);          
    this.selectedCase = tmp;
    this.totalPrice = parseFloat((this.selectedCase.price + this.totalPrice).toFixed(2));  
    }
  }

}



@Component({
  selector: 'ConfirmNewItem',
  templateUrl: 'ConfirmNewItem.html',
  styles: [`
    .confirmMessage {
      color: green;      
    }
  `],
})
export class ConfirmNewItem {}