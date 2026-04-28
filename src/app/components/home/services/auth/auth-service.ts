import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginToken, User } from '../../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/auth/signup';
    return this.http.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/auth/login';
    return this.http.post(url, { email: email, password: password });
  }
  
  activateToken(token: LoginToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
  }
}
