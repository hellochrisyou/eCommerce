import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  userEmail: string = "";
  constructor() { }

  setEmail(tmpEmail)
  {
    this.userEmail = tmpEmail;
    console.log(this.userEmail);
  }

  getEmail()
  {
    console.log(this.userEmail);
    return this.userEmail;
  }
}
