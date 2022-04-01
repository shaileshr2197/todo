import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDueTime]'
})
export class DueTimeDirective {

  @Input() appDueTime:string = '';

  constructor(private el:ElementRef) { }

  ngOnChanges(){
    const hours = new Date(this.appDueTime).getHours();
    if(hours >= 4 && hours < 11){
      this.el.nativeElement.src = '/assets/images/morning.png'
    } else if(hours >= 11 && hours < 16){
      this.el.nativeElement.src = '/assets/images/noon.png'
    } else if(hours >= 16 && hours < 19){
      this.el.nativeElement.src = '/assets/images/evening.png'
    } else{
      this.el.nativeElement.src = '/assets/images/night.png'
    }
  }

}
