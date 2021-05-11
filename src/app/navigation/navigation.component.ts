import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public chart: Chart;
  pageviews: any = [];
  dateArray: any = [];
  pageviewsArray: any = [];
  lineChartLabels: any;
  DataArray: any = [];
  sort: any = [];
  currentDate: Date;
  latest_date: string;
 
  constructor(private http: HttpClient, public datepipe: DatePipe) {
    this.currentDate = new Date();
    this.latest_date = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');

    console.log(this.latest_date)
  }

  ngOnInit() {
    console.log("Hello bro")
    this.currentDate = new Date();
    console.log(this.currentDate);
    let headers = {
      "accept": "application/json"
    }
    this.http.get("https://ppks.ml:5000/dbkl/getGoogleAnalyticsReport", { headers: headers }).subscribe(data => {
      console.log(JSON.stringify(data))


      this.DataArray = data;

      for (let i = 0; i < this.DataArray.length; i++) {
        this.dateArray.push(this.DataArray[i].date);
        this.pageviews.push(this.DataArray[i].Pageviews)
        console.log(this.dateArray)
        if (this.DataArray[i].date.length > 8) {
          this.sort.push(this.DataArray[i].date.substring(8, 10));
          console.log("after sort" + this.sort)

        }
        else{
          this.sort.push("Today");
        }
        this.chart.config.data.labels.push(this.sort[i]);

        this.chart.data.datasets.forEach((dataset) => {
          dataset.data.push(this.pageviews[i]);
        });

        this.chart.update();
      }

    })



    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "# of page views",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

  }


}
