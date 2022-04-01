import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { HomeComponent } from './components/home/home.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { DueTimePipe } from './due-time.pipe';
import { DueTimeDirective } from './due-time.directive'
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
    ActivitiesComponent,
    SigninComponent,
    DueTimePipe,
    DueTimeDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers:[HomeService]
})
export class HomeModule { }
