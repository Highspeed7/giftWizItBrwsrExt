import { Component, OnInit } from '@angular/core';
import { GiftListService } from '../services/gift-list.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {

  constructor(private glSvc: GiftListService) { }

  ngOnInit() {
    
  }

}
