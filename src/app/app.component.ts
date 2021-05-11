
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CURRENT_LOCALE } from './current-locale.token';
declare const ga: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lang = 'ru';
  public currentDate = new Date();
  public localesMap = {
    'en-US': '🇺🇸',
    ru: '🇷🇺',
    fr: '🇫🇷',
    ms: 'ms',
    or: 'or'
  };
  public get locales(): string[] {
    return Object.keys(this.localesMap);
  }

  constructor(

    @Inject(PLATFORM_ID) private platformId: Object,
    public translateService: TranslateService,
    @Inject(CURRENT_LOCALE) public currentLocale$: Observable<string>,
    public router: Router
  ) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
    // this.router.events.subscribe(event => {

    //   if (event instanceof NavigationEnd) {
    //     gtag('config', 'UA-0000000-1', {
    //       'page_title': 'Your custom title',
    //       'page_path': event.urlAfterRedirects
    //     });
    //     gtag('config', 'UA-195895257-2');
    //   }
    // });


  }

  ngOnInit() {

  }
  changeLang(lang) {
    this.translateService.use(lang);

  }
  save(){
    localStorage.setItem('lang','ms')
  }
}
