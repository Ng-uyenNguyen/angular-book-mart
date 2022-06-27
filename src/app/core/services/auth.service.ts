import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStateChanged = new BehaviorSubject<boolean>(Boolean(localStorage.getItem('authState')));

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    AIzaSyAA2Wxg7BvplA4OsnLbQni8i5t-zGkgKIw`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

  signin(email: string, password: string) {
    return this.http.post<AuthResponseData>(`  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
    AIzaSyAA2Wxg7BvplA4OsnLbQni8i5t-zGkgKIw`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(res => {
        localStorage.setItem('authState', 'true'),
          this.authStateChanged.next(Boolean(localStorage.getItem('authState')))
      }));
  }

  logout() {
    localStorage.removeItem('authState');
    this.authStateChanged.next(Boolean(localStorage.getItem('authState')))
  }
}
