import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GiftListModule } from './gift-list/gift-list.module';
import { NotifModule } from './notif/notif.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GiftListModule,
    NotifModule,
    MsalModule.forRoot({
      clientID: "80796ab3-282c-49cd-8d61-eb66f744e64b"
    }),
    RouterModule.forRoot([{
      "path": "",
      "component": HomeComponent
    }])
  ],
  providers: [MsalService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
