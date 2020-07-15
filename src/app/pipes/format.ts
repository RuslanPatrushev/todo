import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'format'
})
export class Format implements PipeTransform {

  transform(value: string): string {
    let temp: string = '';
    for (let i = 0; i < value.length; i++) {
      if (i % 2 == 0) {
        temp += value[i].toUpperCase();
      } else {
        temp += value[i].toLowerCase();
      }
    }
    return temp;
  }

}
