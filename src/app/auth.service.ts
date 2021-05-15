import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './register/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  
  // private userIsAuthenticated: boolean = !!localStorage.getItem('token');

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user: User) : Observable<any> {
    
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<User>(this._registerUrl, user, options);
  }

  loginUser(user: User) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = {headers: headers};
    return this.http.post<User>(this._loginUrl, user, options);
  }

  get loggedIn () {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}

