import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from './model/user';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {RegisterRequest} from './model/register-request';
import {environment} from '../../../environments/environment';
import {LoginRequest} from './model/login-request';
import {LoginResponse} from './model/login-response';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.retrieve('currentUser')));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signup(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/signup`, registerRequest, {responseType: 'text'});
  }

  login(loginPayload: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginPayload)
      .pipe(map((response) => {
        this.localStorage.store('currentUser', JSON.stringify(response, (key, val) => {
          if (key !== 'authenticationToken') {
            return val;
          }
        }));
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.currentUserSubject.next(response);

        return true;
      }), catchError(() => of(false)));
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() !== null;
  }

  logout() {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('currentUser');
    this.currentUserSubject.next(null);
  }
}
