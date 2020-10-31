//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Reading } from '../models/reading';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://18.212.74.206:8080/api/readings';

  constructor(private http: HttpClient) { }

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
  createItem(item): Observable<Reading> {
    return this.http
      .post<Reading>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single reading data by ID
  getItem(id): Observable<Reading> {
    return this.http
      .get<Reading>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get readings data
  getList(): Observable<Reading> {
    return this.http
      .get<Reading>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id, item): Observable<Reading> {
    return this.http
      .put<Reading>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Reading>(this.base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}