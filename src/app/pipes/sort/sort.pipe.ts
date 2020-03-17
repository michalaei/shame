import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sort'})
export class SortPipe implements PipeTransform {

  transform(array: any[], fields: string[] = ['id']): any[] {
    const newArr = [...array];
    return newArr && newArr.length ? newArr.sort((a, b) => {
      let fieldOfA = a[fields[0]];
      let fieldOfB = b[fields[0]];

      for (let i = 1; i < fields.length; i++) {
        fieldOfA = fieldOfA ? this.getNextVal(fieldOfA, fields[i]) : '';
        fieldOfB = fieldOfB ? this.getNextVal(fieldOfB, fields[i]) : '';
      }

      if (fieldOfA < fieldOfB) {
        return -1;
      } else if (fieldOfA > fieldOfB) {
        return 1;
      } else {
        return 0;
      }
    }) : [];
  }

  getNextVal(obj: any, field: string) {
    return obj[field] ? obj[field] : '';
  }
}
