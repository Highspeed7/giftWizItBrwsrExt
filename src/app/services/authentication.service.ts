import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as authConfig from '../configs/authConfig';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private accountInfoSource = new Subject<any>();
  private accountInfo$ = this.accountInfoSource.asObservable();

  private tokenExistsSource = new Subject<boolean>();
  private tokenExists$ = this.tokenExistsSource.asObservable();

  private token = null;
  private auth = false;

  private authEndpoint: string;

  constructor(
    private msal: MsalService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.authEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1&client_id=80796ab3-282c-49cd-8d61-eb66f744e64b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fadofnoobbeoahcnapncpcndebfcfdcbi.chromiumapp.org%2F&scope=https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fwrite%20https%3A%2F%2Fgiftwizit.onmicrosoft.com%2Fapi%2Fread&response_type=token&prompt=login"; 
  }

  public login() {
      chrome.identity.launchWebAuthFlow({
        'url': this.authEndpoint,
        'interactive': true
      }, (r: any) => {
        var access_token = r.split("access_token=")[1].split("&")[0];
        console.log(access_token + " from " + r);
        chrome.storage.sync.set({"access_token": access_token}, () => {
          this.token = access_token;
          this.tokenExistsSource.next(true);
          this.auth = true;
        });
      });
  }

  public getToken() {
    return this.token;
  }

  public getUserId() {
    var user = null;
    console.log("Token to use in call: " + this.token);
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

  public tokenExists(): Observable<boolean> {
    chrome.storage.sync.get("access_token", (t) => {
      if(t.access_token != null) {
        // Set the access token on check.
        this.token = t.access_token;
        this.tokenExistsSource.next(true)
      }else {
        this.tokenExistsSource.next(false);
      }
    })
    return this.tokenExists$;
  }

  public getAccountInfoFeed() {
    return this.accountInfo$;
  }
}
