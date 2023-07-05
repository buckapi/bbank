import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexResponsive,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
  grid: ApexGrid;
};

@Component({
  selector: 'app-wallet-coin-chart',
  templateUrl: './wallet-coin-chart.component.html',
  styleUrls: ['./wallet-coin-chart.component.css']
})
export class WalletCoinChartComponent implements OnInit {

  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
        series: [
             {
                name: "New Clients",
                data: [300, 450, 600, 600, 400, 450, 410, 470, 480, 800, 600, 900, 400]
            }
        ],
        chart: {
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            sparkline: {
                //enabled: true
            },
            offsetX: -10,
        },
        plotOptions: {
            bar: {
                columnWidth: "30%",
                // endingShape: "rounded",
                // startingShape: "rounded",
                
                colors: {
                    backgroundBarColors: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0'],
                    backgroundBarOpacity: 1,
                    backgroundBarRadius: 5,
                },

            },
            // distributed: true
        },
        colors:['#363062'],
        grid: {
            show: false,
        },
        legend: {
            show: false
        },
        fill: {
          opacity: 1
        },
        dataLabels: {
            enabled: false,
            // colors: ['#000'],
            dropShadow: {
              enabled: true,
              top: 1,
              left: 1,
              blur: 1,
              opacity: 1
          }
        },
        xaxis: {
         categories: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
          labels: {
           style: {
              colors: '#787878',
              fontSize: '13px',
              fontFamily: 'poppins',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
          crosshairs: {
            show: false,
          },
          axisBorder: {
              show: false,
            },
        },
        yaxis: {
        labels: {
           style: {
              colors: '#3e4954',
              fontSize: '14px',
               fontFamily: 'Poppins',
              fontWeight: 100,
              
            },
             formatter: function (y) {
                      return y.toFixed(0) + "k";
                    }
          },
        },
        tooltip: {
            x: {
                show: true
            }
        },
         responsive: [{
            breakpoint: 575,
            options: {
                chart: {
                    height: 250,
                }
            }
         }]
    };
  }

  ngOnInit(): void {
  }

}
