import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { fromEvent, merge, of, Subscription, timer } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective implements OnDestroy{

  private event$:Subscription;

  private threshold = 500;

  private emitted = false;
  
  @Output() mouseLongPress:EventEmitter<string> = new EventEmitter()

  constructor(private el:ElementRef) {
    const touchstart = fromEvent(this.el.nativeElement, 'touchstart').pipe(map(() => {
      this.emitted = false;
      return true
    }));
    const touchEnd = fromEvent(this.el.nativeElement, 'touchend').pipe(map(() => false));
    this.event$ = merge(touchstart, touchEnd)
      .pipe(
        switchMap(state => state ? timer(this.threshold, 100) : of(null)
        ),
        filter((value:any) => value)
      )
      .subscribe(() => {
          if(!this.emitted){
            this.mouseLongPress.emit();
            this.emitted = true
          }
      });
  }

  ngOnDestroy(): void {
    if (this.event$) {
      this.event$.unsubscribe();
    }
  }

}
