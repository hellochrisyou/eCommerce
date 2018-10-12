import { components, account } from './../Models/interfaces';
import { Component, OnInit } from '@angular/core';
import { MakeService } from '../Services/make.service';
import { FormBuilder } from '@angular/forms';

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

  constructor(private MakeService: MakeService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
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
          console.log(newCount);

          if (this.orders[tmp].orderDate.substring(5, 7) == '01')
          {
            this.countJan = this.NewCountJan + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '02')
          {
            this.countFeb = this.NewCountFeb + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '03')
          {
            this.countMar = this.NewCountMar + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '04')
          {
            this.countApr = this.NewCountApr + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '05')
          {
            this.countMay = this.NewCountMay + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '06')
          {
            this.countJun = this.NewCountJun + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '07')
          {
            this.countJul = this.NewCountJul + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '08')
          {
            this.countAug = this.NewCountAug + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '09')
          {
            this.countSep = this.NewCountSep + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '10')
          {
            this.countOct = this.NewCountOct + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '11')
          {
            this.countNov = this.NewCountNov + 1; 
          }
          if (this.orders[tmp].orderDate.substring(5, 7) == '12')
          {
            this.countDec = this.NewCountDec + 1; 
          }
        }                
        this.totalOrders = this.orders.length;
        this.revenue = this.orders[tmp].total_Price + this.revenue;
        console.log('revenu', this.revenue);
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
      
      console.log('sampledata', [55, 60, 75, 82, 56, 62, 80]);
      console.log('dataNewOrders', this.dataNewOrders);
      console.log('dataUsedOrders', this.dataUsedOrders);
      console.log('barchartdata', this.barChartData);
      console.log('secondObj', this.secondObj);

      this.firstObj.data = this.dataNewOrders;
      this.firstObj.label = 'New';
      this.secondObj.data = this.dataUsedOrders;
      this.secondObj.label = 'Used';

      this.barChartData.push(this.firstObj);
      this.barChartData.push(this.secondObj);

      console.log('barchartdata', this.barChartData);

      this.orderData.push(usedCount);
      this.orderData.push(newCount);         
    });
    
    
  }

  submitNewComponent()
  {
    console.log('thisselectedcomponent', this.selectedComponent);
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

    //added
    if (localStorage.getItem('isMaster') == 'true')
    {
      this.isMaster = 'true';
    }
    else 
    {
      this.isMaster = 'false';
    }
    //end

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

  