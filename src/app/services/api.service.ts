//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Reading } from '../models/reading';
import { User } from '../models/user';
import { Chemicals } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { flatMap, retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  readings_base_path = 'https://poolpal-server.herokuapp.com/api/readings';
  user_base_path = 'https://poolpal-server.herokuapp.com/api/users';
  chemicals_base_path = 'https://poolpal-server.herokuapp.com/api/chemicals';

  constructor(public http: HttpClient) { }

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


  // Create a new item
  createReading(item): Observable<Reading> {
    return this.http
      .post<Reading>(this.readings_base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single reading data by ID
  getReading(id): Observable<Reading> {
    return this.http
      .get<Reading>(this.readings_base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get readings data
  getReadings(userId): Observable<object[]> {
    return this.http.get(this.readings_base_path + '/' + userId).
      pipe(
        map((data: Reading[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  // Update item by id
  updateReading(id, item): Observable<Reading> {
    return this.http
      .put<Reading>(this.readings_base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteReading(id) {
    return this.http
      .delete<Reading>(this.readings_base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Create a new item
  createUser(item): Observable<User> {
    return this.http
      .post<User>(this.user_base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single reading data by ID
  getUser(id) {
    return this.http
      .get(this.user_base_path + '/' + id)
      .pipe(
        map((response:Response)=>response.json()),
        retry(2),
        catchError(this.handleError)
      )
}

  getUserList(): Observable<object[]> {
    return this.http.get(this.user_base_path).
      pipe(
        map((data: User[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  // Update item by id
  updateUser(id, item): Observable<User> {
    console.log(id);
    console.log(item);
    return this.http
      .put<User>(this.user_base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteUser(id) {
    return this.http
      .delete<User>(this.user_base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}