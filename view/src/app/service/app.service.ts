import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public loader:BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http:HttpClient) {}

  public post(data:any,url:string):Observable<any>{
    return this.http.post(environment.baseUrl+''+url,data);
  }

  public put(data:any,url:string):Observable<any>{
    return this.http.put(environment.baseUrl+''+url,data);
  }

  public get(url:string):Observable<any>{
    return this.http.get(environment.baseUrl+''+url);
  }

  public delete(data:any,url:string):Observable<any>{
    return this.http.delete(environment.baseUrl+''+url,{body:data});
  }
  
  public updateLoaderState(type:string){
    this.loader.next(type);
  }
}
