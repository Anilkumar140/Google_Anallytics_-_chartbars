import { map, startWith } from 'rxjs/operators';
import { FactoryProvider, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CURRENT_LOCALE } from './current-locale.token';

export const CURRENT_LOCALE_PROVIDER: FactoryProvider = {
    provide: CURRENT_LOCALE,
    useFactory: (translateService: TranslateService, defaultLocale: string) => {
        return translateService.onLangChange.pipe(
            map(e => e.lang),
            startWith(defaultLocale)
        );
    },
    deps: [TranslateService, LOCALE_ID],
};
