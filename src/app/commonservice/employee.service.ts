import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://dummy.restapiexample.com/api/v1';
  private debounceSubject = new Subject<any>();

   constructor(private http: HttpClient) {
    // this.debounceSubject.pipe(debounceTime(2000)).subscribe(request => {
    //   request.call();
  //  });
   }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, employee).pipe(
      catchError(this.handleError)
    );
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, employee).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  debounceRequest(call: () => void) {
    this.debounceSubject.next({ call });
  }

//   private handleError(error: HttpErrorResponse) {
//     console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
//     return throwError('Something went wrong; please try again later.');
//   }
// }

private handleError(error: HttpErrorResponse) {
  if (error.status === 429) {
    const retryAfter = error.headers.get('Retry-After');
    console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
  } else {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  }
  return throwError('Something went wrong; please try again later.');
}

}








// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   constructor() { }
// }
