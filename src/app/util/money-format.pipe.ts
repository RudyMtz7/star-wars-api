import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat',
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return '$ ' + numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
      return value; // Return the original value if it's not a valid number
    }
  }
}
