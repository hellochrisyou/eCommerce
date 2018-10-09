import { MakeService } from './../Services/make.service';
import { ShoppingcartService } from './../Services/shoppingcart.service';
import { ShoppingcartComponent } from './../shoppingcart/shoppingcart.component';
import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { thisOrder, KeyValuePair} from './../Models/interfaces'

@Component({
  selector: 'app-buy-new',
  templateUrl: './buy-new.component.html',
  styleUrls: ['./buy-new.component.css'],
  providers: [MakeService]
})
export class BuyNewComponent implements OnInit {
    caseItem: any[];
    selectedCase: KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    coolingFan: any[];
    selectedFan : KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    CPU: any[];
    selectedCPU : KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    GPU: any[];
    selectedGPU : KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    motherboard: any[];
    selectedMotherboard : KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    powerSupply: any[];
    selectedPSupply : KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    RAM: any[];
    selectedRAM : KeyValuePair =  {
      name: '',
      price: '',
      model: '',
      series: '',
      brand: '',
      details: ''
    };
    storage: any[];
    selectedStorage : KeyValuePair =  {
      name: '',
      price: '',
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
      console.log(this.key);
    }
    constructor(private ShoppingcartService: ShoppingcartService, private MakeService: MakeService, private _formBuilder: FormBuilder) { }

    ngOnInit() {
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
        // this.MakeService.getSoftware().subscribe(software => this.software = software);
          
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

  // createCase()
  // {
    // this.modelObject = {Name: 'testName', Price: 1000};
    // console.log(this.modelObject);
    // this.MakeService.createCase(this.modelObject).subscribe(x => console.log(x));  
  // }

  setValue()
  {  

    // var selectedCategory = this.caseItem.find(m => m.id == this.tmpThisOrder.order_Number);
    // console.log('select', selectedCategory);
    
  }
  onCaseChange()
  {
    var selectedCategory = this.caseItem.find(m => m.name == this.tmpThisOrder.case);   
    this.selectedCase = selectedCategory;   
    console.log(this.selectedCase);
  }


  addOrder()
  {
    this.ShoppingcartService.add(this.tmpThisOrder);    
  }

}
