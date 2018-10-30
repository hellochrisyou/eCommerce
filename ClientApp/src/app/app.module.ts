import { AuthService } from './Services/auth.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatRadioModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule, } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSelectModule, MatSnackBarModule } from  '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BuyNewComponent, ConfirmNewItem } from './buy-new/buy-new.component';
import { MakeService } from './Services/make.service';

import { SellComponent, UploadDialog, SnackErrorMessage } from './sell/sell.component';
import { BuyUsedComponent, ExpandPic, ConfirmUsedItem } from './buy-used/buy-used.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { PhotoService } from './Services/photo.service';
import { MainHomeComponent } from './main-home/main-home.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardComponent, editComponent } from './dashboard/dashboard.component';
import { CheckoutComponent, OrderCompleteSnack } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BuyNewComponent,
    SellComponent,
    BuyUsedComponent,
    OrderhistoryComponent,
    ShoppingcartComponent,
    UploadDialog,
    SnackErrorMessage,
    ExpandPic,
    MainHomeComponent,
    CallbackComponent,    
    ConfirmNewItem,
    ConfirmUsedItem,
    DashboardComponent,
    OrderCompleteSnack,
    editComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,    
    ReactiveFormsModule,
    MatTableModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,    
    BrowserAnimationsModule,
    MatSelectModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatStepperModule,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatSlideToggleModule,    
    ChartsModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'buy-new', component: BuyNewComponent },
      { path: 'home', component: HomeComponent },
      { path: 'buy-used', component: BuyUsedComponent },
      { path: 'sell', component: SellComponent },
      { path: 'orderhistory', component: OrderhistoryComponent },
      { path: 'shoppingcart', component: ShoppingcartComponent },
      { path: 'mainhome', component: MainHomeComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'checkout', component: CheckoutComponent },
    ])
  ],
  entryComponents: [
    UploadDialog, 
    SnackErrorMessage, 
    ExpandPic,     
    ConfirmNewItem, 
    ConfirmUsedItem,
    OrderCompleteSnack,
    editComponent
  ],
  providers: [
    AuthService,
    MakeService, 
    PhotoService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
// enableProdMode();


// platformBrowserDynamic().bootstrapModule(AppModule);