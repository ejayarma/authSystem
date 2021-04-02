import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'authSystem';
  userIsAuthenticated:boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this._authService.loggedIn();
  }
}
