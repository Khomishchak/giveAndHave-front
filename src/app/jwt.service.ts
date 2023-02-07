import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})

export class JwtService {

  constructor() { }

  // public isTokenExpired(token: string): boolean {
  //   return this.jwtHelper.isTokenExpired(token);
  // }

  // public removeExpiredToken() {
  //   const token = localStorage.getItem("token");
  //   if (token && this.isTokenExpired(token)) {
  //     localStorage.removeItem("token");
  //   }
  // }
}
