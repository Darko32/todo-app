import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

const urlLink = 'http://localhost:3000/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) { }

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${urlLink}login`, obj);
  }

  onRegister(obj: any): Observable<any> {
    return this.http.post(`${urlLink}create-account`, obj);
  }
}
