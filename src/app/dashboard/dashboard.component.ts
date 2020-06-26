import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
    @ViewChild('irritantAreaChart') irritantAreaChart!: ElementRef<HTMLCanvasElement>;
    irrChartArea!: Chart;

    @ViewChild('irritantPieChart') irritantPieChart!: ElementRef<HTMLCanvasElement>;
    irrChartPie!: Chart;

    @ViewChild('suggestionAreaChart') suggestionAreaChart!: ElementRef<HTMLCanvasElement>;
    sgChartArea!: Chart;

    @ViewChild('suggestionPieChart') suggestionPieChart!: ElementRef<HTMLCanvasElement>;
    sgChartPie!: Chart;

  constructor() { }
  ngAfterViewInit(): void {
    this.irrChartAreaInit()
    this.irrChartPieInit()
    this.sgChartAreaInit()
    this.sgChartPieInit()
  }

  ngOnInit(): void {
  }


  irrChartAreaInit(){
    this.irrChartArea = new Chart(this.irritantAreaChart.nativeElement, {
        type: 'line',
        data: {
            labels: [
                'Mar 1',
                'Mar 2',
                'Mar 3',
                'Mar 4',
                'Mar 5',
                'Mar 6',
                'Mar 7',
                'Mar 8',
                'Mar 9',
                'Mar 10',
                'Mar 11',
                'Mar 12',
                'Mar 13',
            ],
            datasets: [
                {
                    label: 'Sessions',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(78, 115, 223, 0.05)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(2,117,216,1)',
                    pointBorderColor: 'rgba(2,117,216,1)',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: [
                        10000,
                        30162,
                        26263,
                        18394,
                        18287,
                        28682,
                        31274,
                        33259,
                        25849,
                        24159,
                        32651,
                        31984,
                        38451,
                    ],
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: 'day',
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: 40000,
                            maxTicksLimit: 5,
                            
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}

irrChartPieInit(){
    this.irrChartPie = new Chart(this.irritantPieChart.nativeElement, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Yellow', 'Green'],
            datasets: [
                {
                    data: [55, 30, 15],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
            },
            legend: {
              display: false
            },
            cutoutPercentage: 80,
          },
    });
}

sgChartAreaInit(){
    this.sgChartArea = new Chart(this.suggestionAreaChart.nativeElement, {
        type: 'line',
        data: {
            labels: [
                'Mar 1',
                'Mar 2',
                'Mar 3',
                'Mar 4',
                'Mar 5',
                'Mar 6',
                'Mar 7',
                'Mar 8',
                'Mar 9',
                'Mar 10',
                'Mar 11',
                'Mar 12',
                'Mar 13',
            ],
            datasets: [
                {
                    label: 'Sessions',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(78, 115, 223, 0.05)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(2,117,216,1)',
                    pointBorderColor: 'rgba(2,117,216,1)',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: [
                        10000,
                        30162,
                        26263,
                        18394,
                        18287,
                        28682,
                        31274,
                        33259,
                        25849,
                        24159,
                        32651,
                        31984,
                        38451,
                    ],
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: 'day',
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: 40000,
                            maxTicksLimit: 5,
                            
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}

sgChartPieInit(){
    this.sgChartPie = new Chart(this.suggestionPieChart.nativeElement, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Yellow', 'Green'],
            datasets: [
                {
                    data: [55, 30, 15],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
            },
            legend: {
              display: false
            },
            cutoutPercentage: 80,
          },
    });
}

}
