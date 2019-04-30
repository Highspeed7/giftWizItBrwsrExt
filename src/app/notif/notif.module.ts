import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifComponent } from './notif.component';
import { RouterModule } from '../../../node_modules/@angular/router';

@NgModule({
  declarations: [NotifComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "notifs",
        component: NotifComponent
      }
    ])
  ]
})
export class NotifModule { }
