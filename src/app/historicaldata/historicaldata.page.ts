import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Reading } from '../models/reading';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import * as moment from 'moment';


@Component({
  selector: 'app-historicaldata',
  templateUrl: 'historicaldata.page.html',
  styleUrls: ['historicaldata.page.scss'],
})
export class HistoricalDataPage implements AfterViewInit {
  @ViewChild('chlorineCanvas') private chlorineCanvas: ElementRef;
  @ViewChild('phCanvas') private phCanvas: ElementRef;
  @ViewChild('alkalinityCanvas') private alkalinityCanvas: ElementRef;
  @ViewChild('calciumCanvas') private calciumCanvas: ElementRef;
  @ViewChild('cyaCanvas') private cyaCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  labels: any;
  ph: any;
  free_chlorine: any;
  combined_chlorine: any;
  alkalinity: any;
  calcium: any;
  cyanuric_acid: any;

  readings: Reading[];
  image: String;

  constructor(
    public apiService: ApiService,
    private authService: AuthenticationService,
  ) {

    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (systemDark.matches) {
      this.image = '/assets/logo_dark.png';
    }
    else {
      this.image = '/assets/logo.png';
    }


  }

  ionViewDidEnter() {
    this.getReadingList();
  }

  ngAfterViewInit() {

  }

  buildChlorineChart() {
    this.lineChart = new Chart(this.chlorineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Free Chlorine',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: this.free_chlorine,
            pointRadius: 5,
            pointHoverRadius: 10
          },
          {
            label: 'Combined Chlorine',
            backgroundColor: 'rgba(191,75,75,0.4)',
            borderColor: 'rgba(191,75,75,1)',
            pointBorderColor: 'rgba(191,75,75,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(191,75,75,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: this.combined_chlorine,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      }
    });
  }

  buildPhChart() {
    this.lineChart = new Chart(this.phCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'pH',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: this.ph,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          }
        }
      }
    });
  }

  buildAlkalinityChart() {
    this.lineChart = new Chart(this.alkalinityCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Alkalinity',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: this.alkalinity,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      }
    });
  }

  buildCalciumChart() {
    this.lineChart = new Chart(this.calciumCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Calcium',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: this.calcium,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      }
    });
  }

  buildCyaChart() {
    this.lineChart = new Chart(this.cyaCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'CYA',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: this.cyanuric_acid,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      }
    });
  }

  ngOnInit() {
  }

  getReadingList() {
    this.apiService
      .getReadings(this.authService.token)
      .subscribe((data: any) => {
        console.log(data);
        this.readings = data;
        this.labels = this.readings.map(function (e) {
          return moment(e.reading_date).format('MM-DD-YYYY');
        });
        this.ph = this.readings.map(function (e) {
          return e.ph;
        });
        this.free_chlorine = this.readings.map(function (e) {
          return e.free_chlorine;
        });
        this.combined_chlorine = this.readings.map(function (e) {
          return e.combined_chlorine;
        });
        this.alkalinity = this.readings.map(function (e) {
          return e.alkalinity;
        });
        this.calcium = this.readings.map(function (e) {
          return e.calcium;
        });
        this.cyanuric_acid = this.readings.map(function (e) {
          return e.cyanuric_acid;
        });
        this.buildPhChart();
        this.buildAlkalinityChart();
        this.buildChlorineChart();
        this.buildCalciumChart();
        this.buildCyaChart();
      });
  }
}