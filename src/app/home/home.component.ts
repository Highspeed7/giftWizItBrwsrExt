import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authSvc: AuthenticationService) { }

  ngOnInit() {
  //   // Check if user is logged in
  //   this.authSvc.tokenExists().subscribe((tokenExists) => {
  //     if(!tokenExists) {
  //       this.authSvc.login();
  //     }else {
  //     // Get the user id
  //       if(this.authSvc.getToken() != null) {
  //         console.log("The token is available; making userid call");
  //         this.authSvc.getUserId();
  //       }else {
  //         console.log("The token is not there: " + this.authSvc.getToken());
  //       }
  //     }
  //   });

  //   this.authSvc.getAccountInfoFeed().subscribe(
  //     val => console.log("User info: " + val)
  //   );
  }
}
