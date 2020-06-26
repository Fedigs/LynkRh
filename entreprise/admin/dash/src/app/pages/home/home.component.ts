import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { LynkService } from 'app/lynk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    option: any = {size:10,page:0,type:""};
    users: any;
    totalElements:number;    
    candidats: any[];
    enterprise: any[];
    numenter: number;
    private pages=[];
  
  
     
    public doughnutChartLabels: string[];
    public doughnutChartData: number[];
    public doughnutChartType: string;

  constructor(private _lynkservice: LynkService) {
      this.doughnutChartLabels = ['users number', 'candidat number'];
      this.doughnutChartData = [20, 60];
      this.doughnutChartType = 'doughnut';
  }

  ngOnInit() {
     

    
      this._lynkservice.getUsers(this.option).subscribe(
        (res)=>{
        this.users = res;
        this.totalElements = res.totalElements;
        this.doughnutChartData=[this.totalElements];
        this.pages = new Array(res.totalPages);
      });
      
      this._lynkservice.getEntreprises().subscribe(
        (res)=>{
          this.numenter = res.length;
          console.log(res[0].length);
          this.doughnutChartData=[this.numenter];
        } 
      );

      this._lynkservice.getCandidats(this.option).subscribe(
        (res)=>{
          console.log(res);
        }
      );
      
    }

    
     
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
    console.log(this.users);
    console.log(this.numenter);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }









  // Radar
  public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
 
  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType:string = 'radar';
 
  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }











}

