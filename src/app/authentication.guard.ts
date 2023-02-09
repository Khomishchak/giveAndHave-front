import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private router: Router){}
  
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(state.url == "/login" || state.url == "/register") {
        return true;
      }

      let token = localStorage.getItem('token');

      if(token) {
        if(this.tokenExpired(token)) {
          localStorage.removeItem('token');
          return this.router.parseUrl('/login');
        }
      }else {
        return this.router.parseUrl('/login');
      }
      
      return true;
    }
  
}
