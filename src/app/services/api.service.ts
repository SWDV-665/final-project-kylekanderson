//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Reading } from '../models/reading';
import { User } from '../models/user';
import { Chemicals } from '../models/user';
import { Chemical } from '../models/chemical';
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


  /**
   * Create a new Reading in the database
   * @param reading A Reading object
   */
  createReading(reading: Reading): Observable<Reading> {
    return this.http
      .post<Reading>(this.readings_base_path, JSON.stringify(reading), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Get a reading, based on the supplied Reading ID
   * @param id A reading ID
   */
  getReading(id: String): Observable<Reading> {
    return this.http
      .get<Reading>(this.readings_base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Get an array of Reading objects for a given User ID
   * @param userId A User ID
   */
  getReadings(userId: String): Observable<object[]> {
    return this.http.get(this.readings_base_path + '/' + userId).
      pipe(
        map((data: Reading[]) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  /**
   * Update a Reading
   * @param readingId A Reading ID
   * @param reading A Reading objects
   */
  updateReading(readingId: String, reading: Reading): Observable<Reading> {
    return this.http
      .put<Reading>(this.readings_base_path + '/' + readingId, JSON.stringify(reading), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Delete a reading from the database
   * @param readingId A Reading ID
   */
  deleteReading(readingId: String) {
    return this.http
      .delete<Reading>(this.readings_base_path + '/' + readingId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Create a new user in the database
   * @param user A User object
   */
  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.user_base_path, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Get a User from the database
   * @param userId A User ID
   */
  async getUser(userId: String): Promise<User> {
    const response = await this.http.get<User>(this.user_base_path + '/' + userId).toPromise();
    return response;
  }

  /**
   * Get a full user list from the database
   */
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

  /**
   * Get the full chemical list from the database
   */
  async getChemicalList(): Promise<Chemical[]> {
    const response = await this.http.get<Chemical[]>(this.chemicals_base_path + '/').toPromise();
    return response;
  }

  /**
   * Update a user in the database
   * @param userId A User ID
   * @param user A User object
   */
  updateUser(userId: String, user: User): Observable<User> {
    return this.http
      .patch<User>(this.user_base_path + '/' + userId, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /**
   * Delete a User from the database
   * @param userId A User ID
   */
  deleteUser(userId: String) {
    return this.http
      .delete<User>(this.user_base_path + '/' + userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}