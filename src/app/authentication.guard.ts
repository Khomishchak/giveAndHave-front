import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private router: Router, private jwtService: JwtService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//      this.jwtService.removeExpiredToken();

      if(state.url == "/login" || state.url == "/register") {
        return true;
      }

      let token = localStorage.getItem('token');

      if(!token) {
        return this.router.parseUrl('/login');
      }

      return true;
    }
  
}
