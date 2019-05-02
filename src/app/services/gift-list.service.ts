import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
import { GiftList } from '../models/gift-list';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiftListService {

  private token = null;

  constructor(
    private http: HttpClient,
    private authSvc: AuthenticationService
  ) {
  }

  public getGiftLists(): Observable<any> {
    this.token = this.authSvc.getToken();
    return this.http.get(`${environment.apiUrl}/GiftLists`, {headers: {'Authorization': `bearer ${this.token}`}});
  }
}
