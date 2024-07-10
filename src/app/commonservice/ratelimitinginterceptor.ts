import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class RateLimitingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retryWhen(errors => {
        return errors.pipe(
          mergeMap((error: HttpErrorResponse) => {
            if (error.status === 429) {
              const retryAfter = this.getRetryAfter(error.headers);
              console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
              return throwError(error);
            }
            return throwError(error);
          }),
          delay(1000) // You can adjust the delay time here
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  private getRetryAfter(headers: any): number {
    const retryAfterHeader = headers.get('Retry-After');
    return retryAfterHeader ? +retryAfterHeader : 5; // Default to 5 seconds if Retry-After header is not present
  }
}










// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, mergeMap } from 'rxjs/operators';

// @Injectable()
// export class RateLimitingInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 429) {
//           const retryAfter = Number(error.headers.get('Retry-After')) * 1000; // Retry after the specified seconds

//           console.log(`Rate limit exceeded. Retrying after ${retryAfter / 1000} seconds...`);

//           return new Observable<HttpEvent<any>>(observer => {
//             setTimeout(() => {
//               observer.next(null);
//               observer.complete();
//             }, retryAfter);
//           }).pipe(
//             mergeMap(() => next.handle(req))
//           );
//         }
//         return throwError(error);
//       })
//     );
//   }
// }