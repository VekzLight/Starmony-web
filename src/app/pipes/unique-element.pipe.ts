import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
import { TagScale } from '../interfaces/tagScale.interface';

@Pipe({
  name: 'uniqueElement'
})
export class UniqueElementPipe implements PipeTransform {

  transform(value: TagScale[]): any {
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'tagDTO.id');
    }
    return value;
  }

}
