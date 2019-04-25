import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { RouterModule } from '../../node_modules/@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
