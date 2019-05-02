import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authSvc: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // var param = this.route.snapshot.paramMap.get("redirectTo");
    // console.log(param);
    // Collect params from the url
    var nextRoute = null;
    this.route.queryParams.subscribe(params => {
      nextRoute = params['redirectTo'];
    });

    // Subscribe to the auth observable so we know when we're logged in.
    this.authSvc.isAuthSource$.subscribe((isAuth) => {
      // TODO: check for login failures.
      if(isAuth) {
        this.router.navigate([nextRoute]);
      }else {
        this.authSvc.login();
      }
    });
  }
}
