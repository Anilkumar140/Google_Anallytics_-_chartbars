import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jarvis',
  templateUrl: './jarvis.component.html',
  styleUrls: ['./jarvis.component.css']
})
export class JarvisComponent implements OnInit {
  pageviews: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let headers = {
      "accept": "application/json"
    }
    this.http.get("https://ppks.ml:5000/dbkl/getGoogleAnalyticsReport", { headers: headers }).subscribe(data => {
      console.log(JSON.stringify(data))
      this.pageviews = data;
    })
  }

}
