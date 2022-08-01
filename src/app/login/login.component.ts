import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _AuthService: AuthService, public _Router: Router) { }

  userAdmin: any = 'admin';
  error: string = '';

  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {

  }

  submitLoginForm(loginForm: FormGroup) {
    console.log(loginForm.value);
    console.log(loginForm.valid);

    if (loginForm.valid && loginForm.value.email != 'admin' && loginForm.value.password != 'admin') {
      this._AuthService.login(loginForm.value).subscribe((res) => {
        if (res.message == 'Success') {
          localStorage.setItem('userToken', res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['home']);
          localStorage.removeItem('logoutToken');
        }
        else {
          this.error = res.message;
        }


      });
    }
    else if (loginForm.value.email == 'admin' && loginForm.value.password == 'admin') {
      localStorage.setItem('adminUser', this.userAdmin);
      this._AuthService.userData.next(this.userAdmin);
      this._Router.navigate(['home']);
     
      localStorage.removeItem('logoutToken');
    }

  }

}
