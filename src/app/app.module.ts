import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CURRENT_LOCALE_PROVIDER } from './current-locale.provider';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AsyncDatePipe } from './async-date.pipe';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import enLocale from '@angular/common/locales/en';
import frLocale from '@angular/common/locales/fr';
import msLocale from '@angular/common/locales/ms';
import orLocale from '@angular/common/locales/or';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { lightTheme } from './theme/light-theme';
import { darkTheme } from './theme/dark-theme';
import { ThemeModule } from './theme/theme.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JarvisComponent } from './jarvis/jarvis.component';
import { NgxDatePipe } from './ngx-date.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReplaceSubstring } from './dataPipe';
import { NavigationComponent } from './navigation/navigation.component';
registerLocaleData(enLocale, 'en');
registerLocaleData(msLocale, 'ms');


@NgModule({
  declarations: [
    AppComponent,
    AsyncDatePipe,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BarChartComponent,
    JarvisComponent,
    NgxDatePipe,
    ReplaceSubstring,
    NavigationComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

    ChartsModule,
    FormsModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    })

  ],
  exports:[ReplaceSubstring],
  providers: [CURRENT_LOCALE_PROVIDER, NgxDatePipe,ThemeService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}