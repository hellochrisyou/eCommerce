import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnDestroy {
  emailName = '';
  isExpanded = false;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(public auth: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
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
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
