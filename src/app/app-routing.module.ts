import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { JarvisComponent } from './jarvis/jarvis.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: '', component: BarChartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'barchart', component: BarChartComponent },
  { path: "ganalytics", component: JarvisComponent },
  { path: "navigation", component: NavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
