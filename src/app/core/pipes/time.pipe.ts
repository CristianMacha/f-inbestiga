import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string | Date): unknown {
    moment.locale('es')
    const time = moment(value).calendar();
    return time;
  }

}
