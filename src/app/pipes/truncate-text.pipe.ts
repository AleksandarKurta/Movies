import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, size: number = 14): string {
    return value.length > size ? value.slice(0, size - 1) + '…' : value;
  }
}
