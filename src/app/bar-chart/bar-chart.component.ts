import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';

import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as $ from 'jquery';
import { ThemeService } from '../theme/theme.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  Array1: any = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  baseURL = "https://ppks.ml:5000";
  DataSets: any = [];
  val = 2;
  Loginusername: any = "ANALISIS1234";
  Loginpassword: any = "ANALISIS1234";
  parliamens = [

    "SEGAMBUT",
    "TITIWANGSA",
    "WANGSA MAJU",
    "SETIAWANGSA",
    "BATU",
    "LEMBAH PANTAI (P121)",
    "KEPONG",
    "CHERAS",
    "BUKIT BINTANG",
    "SEPUTEH",
    "BANDAR TUN RAZAK",
  ];

  catago = [
    "PERUMAHAN",
    "PERUMAHAN_TIDAK",
    "[this.secondCata]",
    "KOMERSIAL_TIDAK",
    "PUSAT_TONG_YA",
    "PUSAT_TONG_TIDAK",
  ]
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'JUMLAH PERKHIDMATAN'
        }
      }]
    },
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };

  public barChartLabels: Label[] = ['YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK', 'YA TIDAK'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  // public chartColors: any[] = [
  //   { 
  //     backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"] 
  //   }];
  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];
  public barChartColors: Color[] = [
    { backgroundColor: 'hsl(214deg 65% 62%)' },
    { backgroundColor: 'hsl(95deg 42% 68%)' },
    { backgroundColor: 'hsl(0deg 0% 66%)' },
    { backgroundColor: 'hsl(207deg 63% 84%)' },
    { backgroundColor: 'hsl(79deg 57% 88%)' },
    { backgroundColor: 'hsl(30deg 4% 79%)' },
  ]

  public barChartData: ChartDataSets[] = [
    { data: this.Array1, label: 'Series A', stack: 'a' },
    { data: [28, 48, 40, 19, 86, 27, 90, 35, 86, 27, 90], label: 'Series B', stack: 'a' },
    { data: [28, 48, 41, 19, 86, 27, 90, 23, 86, 27, 90], label: 'Series B', stack: 'a' },
    { data: [20, 59, 80, 81, 40, 55, 40, 56, 86, 27, 90], stack: 'b' },
    { data: [28, 48, 30, 19, 85, 27, 90, 36, 86, 27, 90], stack: 'b' },
    { data: [28, 44, 35, 19, 86, 27, 67, 35, 86, 27, 90], stack: 'b' }


  ];
  accessToken: any;
  getaccess: string;
  selectedGuest1: any;
  selectedGuest: any;
  featureLayers: any = [];
  toggle1: boolean;
  toggle2: boolean;
  show: boolean;
  data: string;
  jsondata: any = [];
  katagoriname: string = "PERUMAHAN_YA";
  show1: boolean;
  catagoriList: any = [];
  stringval: string;
  jsonval: any = [];
  firstCata: any;
  secondcata: any;
  thirdcata: any;
  firstCata1: string;
  catagorylength: any;
  secondCata: string;
  secondCata1: string;
  thirdcata1: string;

  constructor(private themeService: ThemeService, private http: HttpClient) { }

  ngOnInit() {
    // this.show = true;
    // this.data = localStorage.getItem('chartdata');
    // this.jsondata = JSON.parse(this.data);
    // console.log(this.jsondata)
    this.toggle2 = true;
    let body = {
      nama_pengguna: this.Loginusername,
      password: this.Loginpassword,
    };
    let headers = {
      "Content-Type": "application/json",

    };

    this.http
      .post(this.baseURL + "/dbkl/login", body, { headers: headers })
      .subscribe(
        (res) => {

          // console.log("hyy", res);

          // this.spinner.hide();
          // this.router.navigateByUrl("dbkl/dbklmainpage");
          this.accessToken = res["access_token"];
          localStorage.setItem("MyToken", this.accessToken);
          // localStorage.setItem("dbkl_access_token", this.accessToken);
          // localStorage.setItem("user_type", res["user_type"]

        })

  }
  myOptions(nativeElement: any, myOptions: any) {
    throw new Error('Method not implemented.');
  }
  launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
  }
  launch_toast1() {
    var x = document.getElementById("toast1")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
  }


  toggle() {


    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
  getParliament() {
    this.show = true;
    this.featureLayers = [];
    console.log(this.selectedGuest)
    this.getaccess = localStorage.getItem('MyToken');
    let headers = {
      "Content-Type": "application/json",
      "Authorization": this.getaccess
    };

    let body =
    {
      "parlimen": this.selectedGuest
    }
    this.http.post(this.baseURL + "/dbkl/getLapisanFitur", body, { headers: headers }).subscribe((data) => {
      this.show = false;
      this.featureLayers = data;
      // console.log(this.featureLayers);
      this.launch_toast();
    }),
      (error) => {
        this.show = false;
        window.alert("Internal server error try again");
      }
  }

  selectfeatureLayer() {

    let headers11 = {
      "accept": "application/json",
      "Content-Type": "application/json"
    }

    let body1 =
    {
      "lapisan_fitur": this.selectedGuest1
    }

    this.http.post(this.baseURL + "/dbkl/getKategori", body1, { headers: headers11 }).subscribe(res => {

      this.catagoriList = res;
      this.catagorylength = this.catagoriList.length;

      this.firstCata1 = this.catagoriList[0] + "_YA";
      this.firstCata = this.catagoriList[0] + "_TIDAK";
      this.secondCata = this.catagoriList[1] + "_YA";
      this.secondCata1 = this.catagoriList[1] + "_TIDAK";
      this.thirdcata = this.catagoriList[2] + "_YA";
      this.thirdcata1 = this.catagoriList[2] + "_TIDAK";
      // this.secondcata = (this.catagoriList[1] + "_YA");
      // this.thirdcata = (this.catagoriList[2] + "_YA");
      console.log("1st" + this.firstCata + "2nd" + this.secondcata + "3rd" + this.thirdcata);
      console.log("my response" + this.catagoriList);


    })




    this.show1 = false;
    this.show = true;
    let headers = {
      "Content-Type": "application/json",
      "Authorization": this.getaccess
    };

    let body =
    {
      "lapisan_fitur": this.selectedGuest1
    }
    this.http.post(this.baseURL + "/dbkl/grafPerkhidmatanPusatTong", body, { headers: headers }).subscribe((data) => {
      this.show1 = true;
      this.show = false;
      this.jsondata = data;
      this.launch_toast1();
      // console.log(this.jsondata[0]["LEMBAH PANTAI (P121)"].PERUMAHAN_YA);
      // for (let i = 0; i < this.jsondata[0]["LEMBAH PANTAI (P121)"].length; i++) {
      //   console.log("hello");
      // }
      // localStorage.setItem('chartdata', JSON.stringify(this.jsondata));
      this.randomize();

    }),
      (error) => {
        this.show = false;
        window.alert("Internal server error try again");
      }
  }
  public randomize(): void {
    this.show = false;
    // this.katagoriname = "LEMBAH PANTAI (P121)";
    // for (let i = 0; i < this.parliamens.length; i++) {

    //   this.stringval = JSON.stringify(this.jsondata[i][this.parliamens[i]])
    //   this.jsonval = JSON.parse(this.stringval);
    //   console.log(this.jsonval)
    // }
    // console.log(this.stringval)

    // console.log(this.jsondata[0]["LEMBAH PANTAI (P121)"].PERUMAHAN_YA)
    const data = [
      [this.jsondata[0]["LEMBAH PANTAI (P121)"][this.firstCata1], this.jsondata[1]["SEGAMBUT"][this.firstCata1], this.jsondata[2]["BATU"][this.firstCata1], this.jsondata[3]["KEPONG"][this.firstCata1], this.jsondata[4]["SEPUTEH"][this.firstCata1], this.jsondata[5]["BUKIT BINTANG"][this.firstCata1], this.jsondata[6]["BANDAR TUN RAZAK"][this.firstCata1], this.jsondata[7]["WANGSA MAJU"][this.firstCata1], this.jsondata[8]["CHERAS"][this.firstCata1], this.jsondata[9]["TITIWANGSA"][this.firstCata1], this.jsondata[10]["SETIAWANGSA"][this.firstCata1]],
      [this.jsondata[0]["LEMBAH PANTAI (P121)"][this.thirdcata1], this.jsondata[1]["SEGAMBUT"][this.thirdcata1], this.jsondata[2]["BATU"][this.thirdcata1], this.jsondata[3]["KEPONG"][this.thirdcata1], this.jsondata[4]["SEPUTEH"][this.thirdcata1], this.jsondata[5]["BUKIT BINTANG"][this.thirdcata1], this.jsondata[6]["BANDAR TUN RAZAK"][this.thirdcata1], this.jsondata[7]["WANGSA MAJU"][this.thirdcata1], this.jsondata[8]["CHERAS"][this.thirdcata1], this.jsondata[9]["TITIWANGSA"][this.thirdcata1], this.jsondata[10]["SETIAWANGSA"][this.thirdcata1]],
      [this.jsondata[0]["LEMBAH PANTAI (P121)"][this.secondCata], this.jsondata[1]["SEGAMBUT"][this.secondCata], this.jsondata[2]["BATU"][this.secondCata], this.jsondata[3]["KEPONG"][this.secondCata], this.jsondata[4]["SEPUTEH"][this.secondCata], this.jsondata[5]["BUKIT BINTANG"][this.secondCata], this.jsondata[6]["BANDAR TUN RAZAK"][this.secondCata], this.jsondata[7]["WANGSA MAJU"][this.secondCata], this.jsondata[8]["CHERAS"][this.secondCata], this.jsondata[9]["TITIWANGSA"][this.secondCata], this.jsondata[10]["SETIAWANGSA"][this.secondCata]],
      [this.jsondata[0]["LEMBAH PANTAI (P121)"][this.firstCata], this.jsondata[1]["SEGAMBUT"][this.firstCata], this.jsondata[2]["BATU"][this.firstCata], this.jsondata[3]["KEPONG"][this.firstCata], this.jsondata[4]["SEPUTEH"][this.firstCata], this.jsondata[5]["BUKIT BINTANG"][this.firstCata], this.jsondata[6]["BANDAR TUN RAZAK"][this.firstCata], this.jsondata[7]["WANGSA MAJU"][this.firstCata], this.jsondata[8]["CHERAS"][this.firstCata], this.jsondata[9]["TITIWANGSA"][this.firstCata], this.jsondata[10]["SETIAWANGSA"][this.firstCata]],
      [this.jsondata[0]["LEMBAH PANTAI (P121)"][this.secondCata1], this.jsondata[1]["SEGAMBUT"][this.secondCata1], this.jsondata[2]["BATU"][this.secondCata1], this.jsondata[3]["KEPONG"][this.secondCata1], this.jsondata[4]["SEPUTEH"][this.secondCata1], this.jsondata[5]["BUKIT BINTANG"][this.secondCata1], this.jsondata[6]["BANDAR TUN RAZAK"][this.secondCata1], this.jsondata[7]["WANGSA MAJU"][this.secondCata1], this.jsondata[8]["CHERAS"][this.secondCata1], this.jsondata[9]["TITIWANGSA"][this.secondCata1], this.jsondata[10]["SETIAWANGSA"][this.secondCata1]],
      [this.jsondata[0]["LEMBAH PANTAI (P121)"][this.thirdcata], this.jsondata[1]["SEGAMBUT"][this.thirdcata], this.jsondata[2]["BATU"][this.thirdcata], this.jsondata[3]["KEPONG"][this.thirdcata], this.jsondata[4]["SEPUTEH"][this.thirdcata], this.jsondata[5]["BUKIT BINTANG"][this.thirdcata], this.jsondata[6]["BANDAR TUN RAZAK"][this.thirdcata], this.jsondata[7]["WANGSA MAJU"][this.thirdcata], this.jsondata[8]["CHERAS"][this.thirdcata], this.jsondata[9]["TITIWANGSA"][this.thirdcata], this.jsondata[10]["SETIAWANGSA"][this.thirdcata]]
    ];
    // console.log(data.length)
    const clone = this.barChartData;
    for (let i = 0; i < data.length; i++) {
      // console.log(data[0])
      clone[i].data = data[i];
      this.barChartData = clone;
    }
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}

