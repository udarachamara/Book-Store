import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';
import { User } from '../models/user';
import { Api } from '../shared/api-constatnt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any = null

  constructor(private httpClient: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUser(){
    if(this.getToken()){
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    return this.user
  }

  public setUser(data: any){
    this.user = data
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify( data))
  }

  isAuthenticated(data: any): Observable<any>{
    return this.httpClient.post<any>(Api.USER.PREFIX + Api.USER.LOGIN, data);
  }

  logOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}
