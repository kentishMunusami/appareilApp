import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export const TOKEN_KEY = 'PU_AUTH_TOKEN';

@Injectable()
export class AuthService {

    isAuth = false;
    


  constructor(
    private jwtHelperService: JwtHelperService,
    private http: HttpClient
  ) { }
  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    if (!this.jwtHelperService.isTokenExpired(token)) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getIdSalesForce(): string {
    const decodedToken = this.jwtHelperService.decodeToken(AuthService.getToken());
    if (decodedToken && decodedToken.sub) {
      return decodedToken.sub;
    }
  }

  isAuthenticated(): boolean {
    const token = AuthService.getToken();
    return token && !this.jwtHelperService.isTokenExpired(token);
  }

  handleSuccess(headers: HttpHeaders): void {
    if (headers.has('Authorization')) {
      this.setToken(headers.get('Authorization'));
    }
  }

  logOut(): void {
    localStorage.setItem(TOKEN_KEY, '');
  }

  authenticate(mail: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>('http://localhost:8080/login', {
      mail: mail,
      password: password
    }, { observe: 'response' });
  }
}