import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        console.log('this is client side error');
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        console.log('this is server side error');
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }
      console.log(errorMsg);
      return throwError(() => errorMsg);
    })
    // TODO: This can be added later when the loader component is developed
    // ,
    // tap(data => {
    //   console.log('inside tap data :: ', data)
    // })
  )
};