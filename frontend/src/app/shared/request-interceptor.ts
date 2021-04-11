import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, pipe, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const token = this.authService.getToken();

    let newurl = `${environment.BASE_URL}/${environment.VERSION}/${request.url}`;

    const reqClone = request.clone({
      url: newurl,
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    
    return next.handle(reqClone)
    
  }
}
