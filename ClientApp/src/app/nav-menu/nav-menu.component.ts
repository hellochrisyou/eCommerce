import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { EmailService } from '../Services/email.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent{

  
  emailName: string = "";
  isExpanded = false;

  constructor(public auth: AuthService, private emailService: EmailService){ 
    setTimeout(() => {
      this.emailName = this.emailService.getEmail(); 
    console.log('emailname', this.emailName);
   }, 2000);
    
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
