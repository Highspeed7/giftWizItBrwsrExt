import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftListComponent } from './gift-list.component';
import { GiftListService } from '../services/gift-list.service';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AuthGuard } from '../auth.guard';

@NgModule({
  declarations: [GiftListComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "gift-lists",
        component: GiftListComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [GiftListService]
})
export class GiftListModule { }
