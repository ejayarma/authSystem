import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../register/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: User = {
    email: '',
    password: ''
  };

  constructor(private _auth: AuthService, private _router: Router) { }



  ngOnInit(): void {
  }

  loginUser() {
    // console.log(this.loginUserData);
    
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['/specialevents']);
      },
      error => console.log(error)
    )
  }
}
