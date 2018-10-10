import { Component, OnInit } from '@angular/core';
import { MakeService } from '../Services/make.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accounts: any[];
  orders: any[];
  revenue: number = 0;
  tmpAccount: account = {
    email: '',
    master_account: '',
    admin: ''
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

  constructor(private MakeService: MakeService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.MakeService.getAccount().subscribe(account => {
      this.accounts = account                
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
          console.log(usedCount);
        }
        if (this.orders[tmp].type == "New")
        {
          newCount = newCount + 1;
          console.log(newCount);
        }
        
        this.revenue = this.orders[tmp].total_Price + this.revenue;
        console.log('revenu', this.revenue);
      }
      this.orderData.push(usedCount);
      this.orderData.push(newCount);   
      console.log('orderdata', this.orderData);
      console.log('bb', this.pieChartData);
    });
    
    
  }

  updateMaster()
  {

  }

  updateAdmin()
  {

  }
}

class account {
  email: string;
  master_account: string;
  admin: string;
}
