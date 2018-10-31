import { MakeService } from './make.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

(window as any).global = window;
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userAccount: any;
    userEmail: AccountClass = {
        email: "",
        admin: false,
        master_account: false,

    };
    existingUser: ExistingAccountClass = {
        id: '0',
        email: "",
        admin: false,
        master_account: false,
    }    
    auth0 = new auth0.WebAuth({
        clientID: '0MJ1BB2OJ-f_9eaPXxTZA7RBjkkMUR1s',
        domain: 'r13champ.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'https://localhost:5001',
        scope: 'openid email'
    });

    constructor(public router: Router, private makeService: MakeService) {}

    public Login(): void {
        this.auth0.authorize();
    }
    
    public HandleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.SetSession(authResult);
                this.router.navigate(['/']);
            } else if (err) {
                this.router.navigate(['/']);
            }
        });
    }

    private SetSession(authResult): void {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        //create user account if not exist, otherwise set user_email to current user
        this.makeService.GetAccount().subscribe(userAccount => {
            this.userAccount = userAccount;
            //check if user account exists
            var accountExists = this.userAccount.find(m => m.email == authResult.idTokenPayload.email);
            if (accountExists == null) {
                //create account with email value
                this.userEmail.email = authResult.idTokenPayload.email;
                this.makeService.CreateAccount(this.userEmail).subscribe(x => {
                    x
                });
                localStorage.setItem('user_email', this.userEmail.email);
                //get userId.  refactor so you can search last id of user and not make another get request
                this.makeService.GetAccount().subscribe(userAccount => {
                    this.userAccount = userAccount;
                    var accountId = this.userAccount.find(m => m.email == userAccount.email);
                    localStorage.setItem('account_id', accountId.Id);
                    localStorage.setItem('IsAdmin', 'false');
                    localStorage.setItem('isMaster', 'false');
                })
            } else {
                this.existingUser = this.userAccount.find(m => m.email == authResult.idTokenPayload.email)
                if (this.existingUser.admin == true) {
                    localStorage.setItem('IsAdmin', 'true');
                } else {
                    localStorage.setItem('IsAdmin', 'false');
                }
                if (this.existingUser.master_account == true) {
                    localStorage.setItem('isMaster', 'true');
                } else {
                    localStorage.setItem('isMaster', 'false');
                }
                localStorage.setItem('user_email', this.existingUser.email);
                localStorage.setItem('account_id', this.existingUser.id);
            }
        });
    }

    public Logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user_email');
        localStorage.removeItem('account_id');
        localStorage.removeItem('isMaster');
        localStorage.removeItem('IsAdmin');
        window.location.href = 'https://r13champ.auth0.com/v2/logout/?returnTo=https%3A%2F%2Flocalhost%3A5001';
    }

    public IsAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        // console.log(new Date().getTime() < expiresAt);
        return new Date().getTime() < expiresAt;
    }

    public IsAdmin(): boolean {
        if (localStorage.getItem('IsAdmin') == 'true') {
            return true;
        }
        return false;
    }
}

class AccountClass {
    email: string;
    admin: boolean;
    master_account: boolean;
}

class ExistingAccountClass {
    id: string;
    email: string;
    admin: boolean;
    master_account: boolean;
}