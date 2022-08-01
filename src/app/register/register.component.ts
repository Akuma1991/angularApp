import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  error: string = '';
  registerForm: FormGroup = new FormGroup({

    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(70)]),
  });

  constructor(public _AuthService: AuthService, public _Router: Router) { }

  ngOnInit(): void {
  }

  submitRegisterForm(registerForm: FormGroup) {
    console.log(registerForm);

    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe((res) => {
        if (res.message == 'Success') {
          this._Router.navigate(['login']);
        }
        else {
          this.error = res.errors.email.message;
        }


      });
    }

  }





}
