import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private languageCodes: string[] = ["ms", "en"];
  sellang: string;
  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.sellang= localStorage.getItem('lang');
    this.onSelectLanguage(this.sellang);
    this.translateService.addLangs(this.languageCodes);
    // this.translateService.setDefaultLang("ms");
    // this.selectLanguageByCode(this.translateService.getBrowserLang());
  }
  private selectLanguageByCode(languageCode: string): void {
    this.translateService.use(
      this.isLanguageCodeSupported(languageCode)
        ? languageCode
        : this.translateService.getDefaultLang()
    );
  }

  public get currentLanguageCode(): string {
    return this.translateService.currentLang;
  }

  public get supportedLanguageCodes(): string[] {
    return this.languageCodes;
  }

onSelectLanguage(val){
    // console.log(e.target.value);
    this.selectLanguageByCode(val);

  }

  public get todaysDate(): Date {
    return new Date();
  }

  private isLanguageCodeSupported(languageCode: string): boolean {
    return this.supportedLanguageCodes.indexOf(languageCode) > -1;
  }
}
