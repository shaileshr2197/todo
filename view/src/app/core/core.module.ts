import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LongPressDirective } from './directives/long-press.directive';



@NgModule({
  declarations: [
    FooterComponent,
    SidenavComponent,
    LongPressDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FooterComponent,
    SidenavComponent,
    LongPressDirective
  ]
})
export class CoreModule { }
