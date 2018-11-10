import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit, OnDestroy {
  emailName = '';
  isExpanded = false;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor(public auth: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    auth.handleAuthentication();
    setTimeout(() => {
    this.emailName = localStorage.getItem('user_email');
   }, 2000);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  Collapse() {
    this.isExpanded = false;
  }

  Toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
