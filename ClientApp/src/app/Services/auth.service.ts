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
    redirectUri: 'https://localhost:5001',
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
        this.setSession(authResult);        
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);    
    //create user account if not exist, otherwise set user_email to current user
    this.makeService.getAccount().subscribe(userAccount => {
      this.userAccount = userAccount;
    //check if user account exists
    var accountExists = this.userAccount.find(m => m.email == authResult.idTokenPayload.email); 
    if (accountExists == null)
    {
      //create account with email value
      this.userEmail.email = authResult.idTokenPayload.email;
      this.makeService.createAccount(this.userEmail).subscribe(x => {x});
      localStorage.setItem('user_email', this.userEmail.email);
      //get userId.  refactor so you can search last id of user and not make another get request

        // DO WE REALLY NEED TO CALL GET ACCOUNT TWICE?
        this.makeService.getAccount().subscribe(userAccount => {
          this.userAccount = userAccount;
            var accountId = this.userAccount.find(m => m.email == userAccount.email);             
              localStorage.setItem('account_id', accountId.Id);
              localStorage.setItem('isAdmin', 'false');   
              localStorage.setItem('isMaster', 'false');
        }) 
    }        
    else
    {
      this.existingUser = this.userAccount.find(m => m.email == authResult.idTokenPayload.email)

      //added
      //check if user is admin
      if (this.existingUser.admin == true)
      {
        localStorage.setItem('isAdmin', 'true');
      }
      else
      {
        localStorage.setItem('isAdmin', 'false');
      }
      if (this.existingUser.master_account == true)
      {
        localStorage.setItem('isMaster', 'true');
      }
      else
      {
        localStorage.setItem('isMaster', 'false');
      }
      //end

      localStorage.setItem('user_email',this.existingUser.email);
      localStorage.setItem('account_id', this.existingUser.id);
    }
    });      
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');
    localStorage.removeItem('account_id');
    localStorage.removeItem('isMaster');
    localStorage.removeItem('isAdmin');
    window.location.href='https://r13champ.auth0.com/v2/logout/?returnTo=https%3A%2F%2Flocalhost%3A5001';
    
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

  public isAdmin(): boolean {
    if (localStorage.getItem('isAdmin') == 'true')
    {
      return true;
    }
    return false;
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
