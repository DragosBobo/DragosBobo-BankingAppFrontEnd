import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iban'
})
export class IbanPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const len = value.length;
    let result : string = "";
    let slice :string = value.slice(len-4,len);
    for(let i = 0;i<len-4;i++){
      result = result+"* ";
    }
    return result+slice;
  }

}
