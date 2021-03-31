import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) {

  }

  canActivate() : boolean {
    if (this._auth.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false
    }
  }
  
}
