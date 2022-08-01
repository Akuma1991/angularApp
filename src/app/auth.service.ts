import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
    console.log(this.userData);
  }
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();
    }
    else if (localStorage.getItem('adminUser') != null) {
      let admin: any = 'admin';
      this.userData.next(admin);
    }
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:5000/users`, formData)
  }
  login(formData: object): Observable<any> {
    return this._HttpClient.post(`http://localhost:5000/login`, formData)
  }

  logOut() {
    let logoutToken = "true";
    localStorage.setItem('logoutToken',logoutToken);
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminUser');
    this.userData.next(null);
    this._Router.navigate(['login']);
    console.log(this.userData.getValue());
  }
  logOutCheck(){
    if (localStorage.getItem('logoutToken') == 'true') {
      this.logOut();
    }
  }
}
