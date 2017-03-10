import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SecondsToTime'
})

export class SecondsToTimePipe implements PipeTransform {

  transform(value) {
    let duration: Date = new Date(1970, 0, 1,0,0,0);
    duration.setSeconds(value);
    return duration;
  }
}
