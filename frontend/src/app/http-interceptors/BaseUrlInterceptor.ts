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
      req = req.clone({
        url: `${req.url}`
      });
      console.log('set to ', `${req.url}`);
    }
    return next.handle(req);
  }
}
