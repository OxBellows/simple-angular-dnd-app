import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starHide'
})
export class StarHidePipe implements PipeTransform {

  transform(value: string): any {
    const regex = /\*\*_?[\w\W]*?_\*\*/gmi;
    return this.replace(value, regex);
  }

  replace(str: string, regex: RegExp) {
    let matched = str.match(regex);
    matched?.forEach(foundString => {
      foundString = foundString.substring(3, foundString.length - 3);
      regex = /\*\*_?[\w\W]*?_\*\*/mi;
      str = str.replace(regex, ``);
    });
    return str;
  }

}
