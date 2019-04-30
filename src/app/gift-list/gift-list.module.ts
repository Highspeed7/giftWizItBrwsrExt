import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftListComponent } from './gift-list.component';
import { GiftListService } from '../services/gift-list.service';
import { RouterModule } from '../../../node_modules/@angular/router';

@NgModule({
  declarations: [GiftListComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "gift-lists",
        component: GiftListComponent
      }
    ])
  ],
  providers: [GiftListService]
})
export class GiftListModule { }
