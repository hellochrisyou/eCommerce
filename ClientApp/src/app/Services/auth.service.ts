import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global = window;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '0MJ1BB2OJ-f_9eaPXxTZA7RBjkkMUR1s',
    domain: 'r13champ.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://localhost:5001',
    scope: 'openid'
  });

  constructor(public router: Router) {}

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
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.isAuthenticated();
    // Go back to the home route
    window.location.href='https://r13champ.auth0.com/v2/logout/?returnTo=https%3A%2F%2Flocalhost%3A5001';
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    console.log(new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt;
  }
}
