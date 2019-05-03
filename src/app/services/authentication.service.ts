import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as authConfig from '../configs/authConfig';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelper } from '../helpers/jwt-helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthSource = new Subject<boolean>();
  public isAuthSource$ = this.isAuthSource.asObservable();

  private accountInfoSource = new Subject<any>();
  private accountInfo$ = this.accountInfoSource.asObservable();

  private token = null;

  private redirectUrl = null;

  private authEndpoint: string;

  private jwtHelper: JwtHelper;

  constructor(
    private msal: MsalService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.jwtHelper = new JwtHelper();
    this.authEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1&client_id=80796ab3-282c-49cd-8d61-eb66f744e64b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fadofnoobbeoahcnapncpcndebfcfdcbi.chromiumapp.org%2F&scope=https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fwrite%20https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fread&response_type=token&prompt=login"; 
  }

  public login() {
      chrome.identity.launchWebAuthFlow({
        'url': this.authEndpoint,
        'interactive': true
      }, (r: any) => {
        var access_token = r.split("access_token=")[1].split("&")[0];
        // var token_expiry = r.split("expires_in=")[1].split("&")[0];
        // Set token expiration
        // chrome.storage.sync.set({"token_expiry": token_expiry}, () => {});
        // chrome.storage.sync.set({"access_token": access_token}, () => {
        //   this.token = access_token;
        //   this.isAuthSource.next(true);
        // });
        this.jwtHelper.storeToken(access_token, this.setAuthAndToken.bind(this))
      });
  }

  public setAuthAndToken(token: any): any {
    this.token = token;
    this.isAuthSource.next(true);
  }

  public getTokenFromStorage() {
    // Try to get the token from storage.
    chrome.storage.sync.get("access_token", (ac_token) => {
      this.token = ac_token.access_token;
      if(this.token !== null) {
        this.isAuthSource.next(true);
      }else {
        this.login();
      }
    });
  }

  public getToken() {
    return this.token;
  }

  public getUserId() {
    var user = null;
    this.http.get(`${environment.apiUrl}/Users/GetUserId`, {headers: {"Authorization": `bearer ${this.token}`}})
    .subscribe(
      res => this.accountInfoSource.next(res),
      err => {
        console.log("An error occurred: " + JSON.stringify(err));
        switch(err.status) {
          // Unauthorized; Invalid token.
          case 401:
          console.log("logging in");
            this.login();
        }
      }
    );
  }
  
  public getAccountInfoFeed() {
    return this.accountInfo$;
  }
}
