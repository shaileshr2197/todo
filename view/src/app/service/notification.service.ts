import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public item$:Observable<any>;

  constructor(private http:HttpClient,private firestore: Firestore,private _swPush:SwPush) {
    const collect = collection(firestore, 'ToDoList/test/tasks');
    this.item$ = collectionData(collect);
    this.item$.subscribe((data)=>{
      console.log(data);
    })
  }

  public snackBar:BehaviorSubject<string> = new BehaviorSubject('');

  public getPermission(){
    Notification.requestPermission((status)=>{
      console.log('Notification permission status:', status);
    });
  }

  public displayNotification(data:any,options:any) {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then((reg)=>{
        reg?.showNotification(data.title,options);
      });
    }
  }

  public subscribe(subscription:any){
    return this.http.post(environment.baseUrl+'subscribe',subscription).pipe(map(res=>res));
  }

  public updateSnackbar(msg:string){
    this.snackBar.next(msg);
    setTimeout(() => {
      this.snackBar.next('');
    }, 4000);
  }

  public requestSubscription(){
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this._swPush.requestSubscription({
      serverPublicKey: 'BBnp6mCd6elp93LQY9LRPB-QAuWg83uRgVt-cz_KIvaHDFxA2tdGc9oRtB_UAhKx9Uof2Kd7N7Hd0wuUT_Kkg9w'
    }).then((_) => {
      console.log(JSON.stringify(_),'shailesh');
    }).catch((_) => console.log);
  };
}
