import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { LoggedInUser, LoginToken, User } from '../../types/user.interface';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private isAuthenticated = signal<boolean>(false);
  private loggedInUserInfo = signal<LoggedInUser>({} as LoggedInUser);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.initFromStorage();
    }
  }

  private initFromStorage(): void {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');

    if (token && expiry) {
      const isExpired = new Date(expiry) < new Date();
      if (!isExpired) {
        this.isAuthenticated.set(true);
        this.loggedInUserInfo.set({
          firstName: localStorage.getItem('firstName') ?? '',
          lastName: localStorage.getItem('lastName') ?? '',
          address: localStorage.getItem('address') ?? '',
          city: localStorage.getItem('city') ?? '',
          state: localStorage.getItem('state') ?? '',
          pin: localStorage.getItem('pin') ?? '',
          email: localStorage.getItem('email') ?? '',
        });
      } else {
        this.clearStorage();
      }
    }
  }

  clearStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('address');
    localStorage.removeItem('city');
    localStorage.removeItem('state');
    localStorage.removeItem('pin');
    localStorage.removeItem('email');
    this.isAuthenticated.set(false);
    this.loggedInUserInfo.set({} as LoggedInUser);
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated();
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return toObservable(this.isAuthenticated);
  }

  get loggedInUser$(): Observable<LoggedInUser> {
    return toObservable(this.loggedInUserInfo);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('http://localhost:5001/auth/signup', user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5001/auth/login', { email, password });
  }

  activateToken(token: LoginToken): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);
    localStorage.setItem('email', token.user.email ?? '');
    this.isAuthenticated.set(true);
    this.loggedInUserInfo.set(token.user);
  }
}