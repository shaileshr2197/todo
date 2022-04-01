import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './service/notification.service';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public snackBar = this.notification.snackBar;

  public loader$ = this.app.loader;

  constructor(private notification:NotificationService, private swPush:SwPush,private app:AppService){
    this.notification.getPermission();
    this.notification.requestSubscription();
    this.swPush.notificationClicks.subscribe((event)=>{
      console.log(event,'app-comp');
    })
  }

}
