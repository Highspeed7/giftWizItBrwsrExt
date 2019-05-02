import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GiftListService } from '../services/gift-list.service';
import { AuthenticationService } from '../services/authentication.service';
import { GiftList } from '../models/gift-list';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  public giftLists: GiftList[];
  public test: string = "hi";

  private token = null;

  constructor(
    private cdRef: ChangeDetectorRef,
    private glSvc: GiftListService,
    private authSvc: AuthenticationService,
    private router: Router
  ) {
    this.authSvc.isAuthSource$.subscribe((isLoggedIn) => {
      this.getLists();
    });
   }

  ngOnInit() {
    this.token = this.authSvc.getToken();
    if(this.token == null) {
      this.authSvc.login();
    }else {
      this.getLists();
    }
  }

  public getLists() {
    this.glSvc.getGiftLists().subscribe((res) => {
      this.giftLists = res;
      this.cdRef.detectChanges();
    }, (error: any) => {
      switch(error.status) {
        case 401:
          this.authSvc.login();
      }
    })
  }
}
