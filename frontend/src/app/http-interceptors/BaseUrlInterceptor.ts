import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { BACKEND_URL } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (BACKEND_URL) {
      console.log('entered');
      console.log(req);
      console.log('backend url');
      console.log(BACKEND_URL);
      console.log('req url');
      console.log(req.url);
      req = req.clone({
        url: `${req.url}`
      });
      console.log('set to ', `${req.url}`);
    }
    return next.handle(req);
  }
}
