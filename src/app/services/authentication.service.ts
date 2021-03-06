import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap, retry, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject, throwError } from 'rxjs';

import { Plugins } from '@capacitor/core';
import { Chemicals, User } from '../models/user';
const { Storage } = Plugins;

export const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  user_base_path = 'https://poolpal-server.herokuapp.com/api/users';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json',
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  /**
   * Check local storage for a user token
   */
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
      return token.value;
    } else {
      this.isAuthenticated.next(false);
    }
  }

  /**
   * Attempt to authenticate a user against their stored credentials
   * @param credentials An object containing a user email and password
   */
  login(credentials: { email: String, password: String }): Observable<any> {
    return this.http.post(this.user_base_path + '/login', credentials)
  }

  /**
   * Logout a user
   */
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return;
  }

  /**
   * Register a new user
   * @param user A User object
   */
  register(user: User) {
    return this.http
      .post<User>(this.user_base_path, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}