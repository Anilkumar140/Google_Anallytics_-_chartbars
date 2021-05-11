import { Inject, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { CURRENT_LOCALE } from './current-locale.token';

@Pipe({
  name: 'asyncDate',
})
export class AsyncDatePipe implements PipeTransform {
  constructor(@Inject(CURRENT_LOCALE) private currentLocale$: Observable<string>) {}

  transform(value: Date | null, format: string = 'mediumDate', timezone?: string, locale?: string): Observable<string> {
    if (locale) {
      return of(formatDate(value, format, locale, timezone));
    }

    return this.currentLocale$.pipe(map(localeId => formatDate(value, format, localeId, timezone)));
  }
}
