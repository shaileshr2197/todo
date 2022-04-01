import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueTime'
})
export class DueTimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const datePipe = new DatePipe("en-US");
    const date = new Date(value);
    const dayDiff = (date.getTime() - new Date().getTime()) / (1000 * 84600);
    if(dayDiff < 1){
      value = 'Today ';
    } else if(dayDiff < 2){
      value = 'Tomorrow ';
    } else{
      value = datePipe.transform(value,'MMM d, y')+' ';
    }
    return value+datePipe.transform(date,'h:mm a');
  }

}
