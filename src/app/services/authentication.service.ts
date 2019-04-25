import { Injectable } from '@angular/core';
import { MsalService } from '../../../node_modules/@azure/msal-angular';
import * as authConfig from '../configs/authConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authEndpoint: string;

  constructor(
    private msal: MsalService
  ) {
    this.authEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1&client_id=80796ab3-282c-49cd-8d61-eb66f744e64b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fadofnoobbeoahcnapncpcndebfcfdcbi.chromiumapp.org%2F&scope=https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fwrite%20https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fread&response_type=token&prompt=login"; 
  }

  public login() {
      // this.msal.loginPopup(authConfig.config.b2cScopes).then((r) => {
      //   this.msal.acquireTokenSilent(authConfig.config.b2cScopes).then((res) => {
      //     chrome.storage.local.set("auth_token", ()=>{});
      //   });
      // });
      chrome.identity.launchWebAuthFlow({
        'url': this.authEndpoint,
        'interactive': true
      }, (r: any) => {
        console.log(r);
      });
  }
}
