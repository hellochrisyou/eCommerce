import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent{

  
  emailName: string = "";
  isExpanded = false;

  constructor(public auth: AuthService){ 
    //timeout for now, until you can figure out how to set email. Also, component constructor is running twice
    setTimeout(() => {
      localStorage; 
    this.emailName = localStorage.getItem('user_email');
   }, 2000);

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
