import { components, account, KeyValuePair } from './../Models/interfaces';
import { Component, OnInit, Inject } from '@angular/core';
import { MakeService } from '../Services/make.service';
import { FormBuilder } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //added
  isMaster: string;
//end

public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};

countJan: number = 0;
countFeb: number = 0;
countMar: number = 0;
countApr: number = 0;
countMay: number = 0;
countJun: number = 0;
countJul: number = 0;
countAug: number = 0;
countSep: number = 0;
countOct: number = 0;
countNov: number = 0;
countDec: number = 0;

NewCountJan: number = 0;
NewCountFeb: number = 0;
NewCountMar: number = 0;
NewCountApr: number = 0;
NewCountMay: number = 0;
NewCountJun: number = 0;
NewCountJul: number = 0;
NewCountAug: number = 0;
NewCountSep: number = 0;
NewCountOct: number = 0;
NewCountNov: number = 0;
NewCountDec: number = 0;

dataNewOrders: any [] = [12];
dataUsedOrders: any [] = [12];

  public mbarChartLabels:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    { 
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
  firstObj: numberArrObj = {
    data: [],
    label: ''
  };
  secondObj: numberArrObj = {
    data: [],
    label: ''
  };

  barChartData: any [] = [];
    

   
//ended

accounts: any[];
orders: any[];
revenue: number = 0;
totalOrders: number = 0;
totalAccounts: number = 0;

//changed
tmpAccount: account = {
  email: '',
  master_account: true,
  admin: true
}
  orderData: number [] = [];
  
  public pieChartLabels:string[] = ['New', 'Used'];
  public pieChartData:number[] = [45, 25, 30];
  public pieChartType:string = 'pie';


  // sorting logic
  key = 'order_Number'; // sort default by name
  reverse = false;
  sortList(key) {
    this.key = key;
    this.reverse = !this.reverse;
    console.log(this.key);
  }

  private colors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)']
      }
    ]    

  tmpNewComponent: componentDetails = {
    name: '',
    price: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  thisComponent: components[] = [
    {value: 'cpu', viewValue: 'CPU'},
    {value: 'motherboard', viewValue: 'Motherboard'},
    {value: 'ram', viewValue: 'RAM'},
    {value: 'storage', viewValue: 'Storage'},
    {value: 'gpu', viewValue: 'GPU'},
    {value: 'power_Supply', viewValue: 'Power Supply'},
    {value: 'cooling_Fan', viewValue: 'Cooling Fan'},
    {value: 'case', viewValue: 'Case'}
  ];

  selectedComponent: components = {
    value: '',
    viewValue: ''
  };  
  //filter
  listComponents: string [] = ['', 'CPU', 'Motherboard', 'RAM', 'Storage', 'GPU', 'Power Supply', 'Cooling Fan', 'Case'];
  selectedFilter: string;

  filteredComponent: any [] = [];

  powerSupplyComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  coolingFanComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  motherboardComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  gpuComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  cpuComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  ramComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  storageComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }

  caseComponent: KeyValuePair = {
    name: '',
    price: 0,
    hardwareType: '',
    model: '',
    series: '',
    brand: '',
    details: ''
  }
  //end

  constructor(
  public dialog: MatDialog,
  private MakeService: MakeService, 
  private _formBuilder: FormBuilder
  ) {
    
   }

  ngOnInit() {
    //filter
    this.getComponents();
    //end

    this.MakeService.getAccount().subscribe(account => {
      this.accounts = account   
      this.totalAccounts = this.accounts.length;             
    });
    this.MakeService.getOrder().subscribe(order => {
      this.orders = order              
      var usedCount = 0;
      var newCount = 0;
      for (var tmp in this.orders)
      {
        if (this.orders[tmp].type == "Used")
        {
          usedCount = usedCount + 1;                  
          //added
          console.log('month', this.orders[tmp].orderDate.substring(5, 7) );
          if (this.orders[tmp].orderDate.substring(5, 7) == '01')
          {
            this.countJan = this.countJan + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '02')
          {
            this.countFeb = this.countFeb + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '03')
          {
            this.countMar = this.countMar + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '04')
          {
            this.countApr = this.countApr + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '05')
          {
            this.countMay = this.countMay + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '06')
          {
            this.countJun = this.countJun + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '07')
          {
            this.countJul = this.countJul + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '08')
          {
            this.countAug = this.countAug + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '09')
          {
            this.countSep = this.countSep + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '10')
          {
            this.countOct = this.countOct + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '11')
          {
            this.countNov = this.countNov + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '12')
          {
            this.countDec = this.countDec + 1; 
          }
        }          

        if (this.orders[tmp].type == "New")
        {
          newCount = newCount + 1;
          if (this.orders[tmp].orderDate.substring(5, 7) == '01')
          {
            this.NewCountJan = this.NewCountJan + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '02')
          {
            this.NewCountFeb = this.NewCountFeb + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '03')
          {
            this.NewCountMar = this.NewCountMar + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '04')
          {
            this.NewCountApr = this.NewCountApr + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '05')
          {
            this.NewCountMay = this.NewCountMay + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '06')
          {
            this.NewCountJun = this.NewCountJun + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '07')
          {
            this.NewCountJul = this.NewCountJul + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '08')
          {
            this.NewCountAug = this.NewCountAug + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '09')
          {
            this.NewCountSep = this.NewCountSep + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '10')
          {
            this.NewCountOct = this.NewCountOct + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '11')
          {
            this.NewCountNov = this.NewCountNov + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '12')
          {
            this.NewCountDec = this.NewCountDec + 1; 
          }
        }                
        this.totalOrders = this.orders.length;
        this.revenue = this.orders[tmp].total_Price + this.revenue;
      }
      
      this.dataUsedOrders[0] = this.countJan;
      this.dataUsedOrders[1] = this.countFeb;
      this.dataUsedOrders[2] = this.countMar;
      this.dataUsedOrders[3] = this.countApr;
      this.dataUsedOrders[4] = this.countMay;
      this.dataUsedOrders[5] = this.countJun;
      this.dataUsedOrders[6] = this.countJul;
      this.dataUsedOrders[7] = this.countAug;
      this.dataUsedOrders[8] = this.countSep;
      this.dataUsedOrders[9] = this.countOct;
      this.dataUsedOrders[10] = this.countNov;
      this.dataUsedOrders[11] = this.countDec;

      this.dataNewOrders[0] = this.NewCountJan;
      this.dataNewOrders[1] = this.NewCountFeb;
      this.dataNewOrders[2] = this.NewCountMar;
      this.dataNewOrders[3] = this.NewCountApr;
      this.dataNewOrders[4] = this.NewCountMay;
      this.dataNewOrders[5] = this.NewCountJun;
      this.dataNewOrders[6] = this.NewCountJul;
      this.dataNewOrders[7] = this.NewCountAug;
      this.dataNewOrders[8] = this.NewCountSep;
      this.dataNewOrders[9] = this.NewCountOct;
      this.dataNewOrders[10] = this.NewCountNov;
      this.dataNewOrders[11] = this.NewCountDec;
      
      this.firstObj.data = this.dataNewOrders;
      this.firstObj.label = 'New';
      this.secondObj.data = this.dataUsedOrders;
      this.secondObj.label = 'Used';

      this.barChartData.push(this.firstObj);
      this.barChartData.push(this.secondObj);

      this.orderData.push(usedCount);
      this.orderData.push(newCount);               
    });
    
      this.isMaster = localStorage.getItem('isMaster');    
  }

  //filter
  insertAllComponents()
  {
    this.filteredComponent = [];
    this.filteredComponent = this.filteredComponent.concat(this.caseComponent);
    this.filteredComponent = this.filteredComponent.concat(this.coolingFanComponent);
    this.filteredComponent = this.filteredComponent.concat(this.cpuComponent);
    this.filteredComponent = this.filteredComponent.concat(this.gpuComponent);
    this.filteredComponent = this.filteredComponent.concat(this.storageComponent);
    this.filteredComponent = this.filteredComponent.concat(this.ramComponent);
    this.filteredComponent = this.filteredComponent.concat(this.powerSupplyComponent);
    this.filteredComponent = this.filteredComponent.concat(this.motherboardComponent);
    console.log('this.filtered', this.filteredComponent);
  }
  filterList()
  {
    console.log('thisselectedfilter', this.selectedFilter);
    console.log('filteredComponent', this.filteredComponent);
    if (this.selectedFilter == '')
    {
      this.insertAllComponents();
    }
    if (this.selectedFilter == 'CPU')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.cpuComponent);
      console.log('cpufiltered', this.filteredComponent);
    }
    if (this.selectedFilter == 'Motherboard')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.motherboardComponent);
    }
    if (this.selectedFilter == 'RAM')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.ramComponent); 
       }
    if (this.selectedFilter == 'Storage')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.storageComponent);   
     }
    if (this.selectedFilter == 'GPU')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.gpuComponent);  
      }
    if (this.selectedFilter == 'Power Supply')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.powerSupplyComponent);  
      }
    if (this.selectedFilter == 'Cooling Fan')
    { 
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.coolingFanComponent); 
       }
    if (this.selectedFilter == 'Case')
    {
      this.filteredComponent = [];
      this.filteredComponent = this.filteredComponent.concat(this.caseComponent); 
       }

  }
  //end

  submitNewComponent()
  {
    if (this.selectedComponent.value == 'cpu')
    {
      this.MakeService.createCPU(this.tmpNewComponent).subscribe(x => x);      
    }
    if (this.selectedComponent.value == 'motherboard')
    {
      this.MakeService.createMotherboard(this.tmpNewComponent).subscribe(x => x);
    }
    if (this.selectedComponent.value == 'ram')
    {
      this.MakeService.createRAM(this.tmpNewComponent).subscribe(x => x);
    }
    if (this.selectedComponent.value == 'storage')
    {
      this.MakeService.createStorage(this.tmpNewComponent).subscribe(x => x);
    }
    if (this.selectedComponent.value == 'gpu')
    {
      this.MakeService.createGPU(this.tmpNewComponent).subscribe(x => x);
    }
    if (this.selectedComponent.value == 'power_supply')
    {
      this.MakeService.createPowersupply(this.tmpNewComponent).subscribe(x => x);
    }
    if (this.selectedComponent.value == 'cooling_Fan')
    { 
      this.MakeService.createCoolingfan(this.tmpNewComponent).subscribe(x => x);
    }
    if (this.selectedComponent.value == 'case')
    {
      this.MakeService.createCase(this.tmpNewComponent).subscribe(x => x);
    }
    this.ngOnInit();
  }

  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }

    //added
    updateAccount(index, role)
    {
      console.log('this.ismaster', this.isMaster);
      this.tmpAccount = this.accounts[index]; 
      console.log('index', index);
      console.log('this.tmpAccount', this.tmpAccount);
      
      if (this.tmpAccount.admin == true)
      {      
        console.log('this.tmpAccount.admin == true', this.tmpAccount.admin);
        this.tmpAccount.admin = false;                
      }
      else
      {
        console.log('this.tmpAccount.admin == false', this.tmpAccount.admin);
        this.tmpAccount.admin = true;               
      }
      if (this.isMaster == 'true' && role == 'master')
      {
        this.tmpAccount.master_account = this.tmpAccount.admin;
        console.log('this.tmpAccount.master', this.tmpAccount.master_account);
      }
      this.MakeService.updateAccount(this.tmpAccount).subscribe(x => x);        
    }

    deleteComponent(index)
    {      
      if (this.filteredComponent[index].hardwareType == 'CPU')
      {
        this.MakeService.deleteCPU(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents()
          );  
      }
      if (this.filteredComponent[index].hardwareType == 'Case')
      {
        this.MakeService.deleteCase(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents()
          );  
      }
      if (this.filteredComponent[index].hardwareType == 'Cooling Fan')
      {
        this.MakeService.deleteCoolingFan(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents());  
      }
      if (this.filteredComponent[index].hardwareType == 'Motherboard')
      {
        this.MakeService.deleteMotherboard(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents());  
      }
      if (this.filteredComponent[index].hardwareType == 'RAM')
      {
        this.MakeService.deleteRAM(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents());  
      }
      if (this.filteredComponent[index].hardwareType == 'Storage')
      {
        this.MakeService.deleteStorage(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents());  
      }
      if (this.filteredComponent[index].hardwareType == 'Power Supply')
      {
        this.MakeService.deletePowerSupply(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents());  
      }
      if (this.filteredComponent[index].hardwareType == 'GPU')
      {
        this.MakeService.deleteGPU(this.filteredComponent[index].id).subscribe(x =>
          this.getComponents());
      }         
    }

    openDialog(index): void {
      console.log('thisselectedfilter', this.selectedFilter);
      const dialogRef = this.dialog.open(editComponent, {
        width: '250px',
        data: {
          id: this.filteredComponent[index].id,
          name: this.filteredComponent[index].name,
          brand: this.filteredComponent[index].brand ,
          model: this.filteredComponent[index].model ,
          hardwareType: this.filteredComponent[index].hardwareType,
          series: this.filteredComponent[index].series , 
          price: this.filteredComponent[index].price ,
          details: this.filteredComponent[index].details,
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getComponents();
      })
    }
    getComponents()
    {    
      this.MakeService.getCase().subscribe(caseItem => {
        this.caseComponent = caseItem;      
        console.log('casecomponent', this.caseComponent);
          this.MakeService.getCoolingfan().subscribe(coolingFan => {
            this.coolingFanComponent = coolingFan;
              this.MakeService.getCoolingfan().subscribe(coolingFan => {
                this.coolingFanComponent = coolingFan;
                  this.MakeService.getCPU().subscribe(CPU => {
                    this.cpuComponent = CPU;        
                      this.MakeService.getGPU().subscribe(GPU => {
                        this.gpuComponent = GPU;  
                          this.MakeService.getStorage().subscribe(storage => {
                            this.storageComponent = storage;   
                              this.MakeService.getRAM().subscribe(RAM => {
                                this.ramComponent = RAM;
                                  this.MakeService.getPowersupply().subscribe(powerSupply => {
                                    this.powerSupplyComponent = powerSupply;         
                                      this.MakeService.getMotherboard().subscribe(motherboard => {
                                        this.motherboardComponent = motherboard;         
                                        this.insertAllComponents();
                                      });
                                  });
                              });      
                          });       
                      });
                  });
              });
          });
      });
    }
}

class componentDetails 
{
  name: string;
  price: string;
  model: string;
  series: string;
  brand: string;
  details: string;  
}

class numberArrObj 
{
  data: any[];
  label: string;
}

@Component({
  selector: 'editComponent',
  templateUrl: 'editComponent.html',
  styles: [`
        .picSize {
          height: 100%;
          width: 100%;      
        }
      `],
})

export class editComponent{  
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<editComponent>,
    private MakeService: MakeService, 
    @Inject(MAT_DIALOG_DATA) public tmpComponent: any = {
      id: 0,
      name: '',
      price: 0,
      hardwareType: '',
      model: '',
      series: '',
      brand: '',
      details: '',
      },       
    ){}

      ngOnInit() {
        
      }
      cancel(): void {                    
        this.dialogRef.close();      
      }
      submit(): void {
        console.log('thiscomponetnname', this.tmpComponent);
        if (this.tmpComponent.hardwareType == 'CPU')
        {
          this.MakeService.updateCPU(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'Motherboard')
        {
          this.MakeService.updateMotherboard(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'RAM')
        {
          this.MakeService.updateRAM(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'Storage')
        {
          this.MakeService.updateStorage(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'GPU')
        {
          this.MakeService.updateGPU(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'Power Supply')
        {
          this.MakeService.updatePowerSupply(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'Cooling Fan')
        {
          this.MakeService.updateCoolingFan(this.tmpComponent).subscribe(x => x);
        }
        if (this.tmpComponent.hardwareType == 'Case')
        {
          this.MakeService.updateCase(this.tmpComponent).subscribe(x => console.log('done'));
        }
        
        this.dialogRef.close();
      }
    }  
    class stringProvider {
      componentName: string;
    }     
    
        
        
    
    