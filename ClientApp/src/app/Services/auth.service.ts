import { MakeService } from './make.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global = window;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: accountClass = {
    email: "",
    admin: false,
    master_account: false,

  };
  existingUser: existingAccountClass = {
    id: '0',
    email: "",
    admin: false,
    master_account: false,
  }
  userAccount: any;
  auth0 = new auth0.WebAuth({
    clientID: '0MJ1BB2OJ-f_9eaPXxTZA7RBjkkMUR1s',
    domain: 'r13champ.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://localhost:5001/callback',
    scope: 'openid email'
  });

  constructor(public router: Router, private makeService: MakeService) {    
  }



  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        console.log('authresult', authResult);
        this.setSession(authResult);        
        this.router.navigate(['/']);
      } else if (err) {
        console.log('no token', authResult);
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);    
    console.log('token', auth0.id_token);
    console.log('useremail', authResult.idTokenPayload.email);
    //create user account if not exist, otherwise set user_email to current user
    this.makeService.getAccount().subscribe(userAccount => {
      this.userAccount = userAccount;
      console.log('useraccount', this.userAccount);
    //check if user account exists
    var accountExists = this.userAccount.find(m => m.email == authResult.idTokenPayload.email); 
    if (accountExists == null)
    {
      //create account with email value
      this.userEmail.email = authResult.idTokenPayload.email;
      this.makeService.createAccount(this.userEmail).subscribe(x => {x});
      localStorage.setItem('user_email', this.userEmail.email);
      //get userId.  refactor so you can search last id of user and not make another get request
        this.makeService.getAccount().subscribe(userAccount => {
          this.userAccount = userAccount;
          console.log('useraccount', this.userAccount);
            var accountId = this.userAccount.find(m => m.email == userAccount.email); 
              localStorage.setItem('account_id', accountId.Id);   
              console.log('local storage', localStorage);
        }) 
    }        
    else
    {
      this.existingUser = this.userAccount.find(m => m.email == authResult.idTokenPayload.email)
      localStorage.setItem('user_email',this.existingUser.email);
      localStorage.setItem('account_id', this.existingUser.id);
      console.log('local storage', localStorage);
      console.log('existinguser', this.existingUser);
    }
    });      
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');
    window.location.href='https://r13champ.auth0.com/v2/logout/?returnTo=https%3A%2F%2Flocalhost%3A5001';
    console.log('localstorage', localStorage);
    
    // this.isAuthenticated();
    // Go back to the home route
    
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    // console.log(new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt;
  }
}

class accountClass 
{  
  email: string;
  admin: boolean;
  master_account: boolean;
}

class existingAccountClass
{
  id: string;
  email: string;
  admin: boolean;
  master_account: boolean;
}
