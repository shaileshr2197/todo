import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private app:AppService) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.app.updateLoaderState('api');
    return next.handle(req).pipe(map((event:HttpEvent<any>)=>{
      setTimeout(() => {
        this.app.updateLoaderState('');
      }, 100);
      return event;
    }));
  }
}
