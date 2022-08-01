import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    console.log(this._AuthService.userData.getValue());
    this._AuthService.logOutCheck();
  }

}
