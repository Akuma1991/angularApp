import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  userData: any = '';
  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
        this.userData = this._AuthService.userData.getValue();
        console.log(this.userData = this._AuthService.userData.getValue());
      } else {
        this.isLogin = false;
      }
    });

  }

  logOut() {
    this._AuthService.logOut();
  }

}
