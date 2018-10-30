import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {

  constructor(public auth: AuthService) {
      auth.handleAuthentication();
      auth.isAdmin();   
  }

  ngOnInit() {}
}
