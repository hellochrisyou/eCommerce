import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
 })
 export class CallbackComponent implements OnInit {
 
  constructor(
   private auth: AuthService,
   private router: Router
  ) {}
 
  ngOnInit() {
   if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/home']);
   }
  }
 
 }