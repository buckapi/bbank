import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  colors: string[];
  fill: ApexFill;
  tooltip: ApexTooltip;
};


@Component({
  selector: 'app-current-graph2',
  templateUrl: './current-graph2.component.html',
  styleUrls: ['./current-graph2.component.css']
})
export class CurrentGraph2Component implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [{
          name: 'series1',
          data: [18, 38, 38, 70, 75, 60, 75, 66]
        }, {
          name: 'series2',
          data: [18, 20, 20, 30, 45, 40, 25, 37]
        }],
        chart: {
          height: 280,
		  toolbar:{
			show:false
		  },
          type: 'area'
        },
        colors:['#363062','#58c99d'],
		legend:{
			show:false
		},
        dataLabels: {
          enabled: false
        },
        stroke: {
			width:4,
          curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
			  labels: {
			   style: {
				  colors: '#787878',
				  fontSize: '14px',
				   fontFamily: 'Poppins',
				  fontWeight: 100,
				  
				},
			  },
		},
		yaxis: {
			show:false
		},
		fill:{
			opacity:0.2,
			type:'solid'
		},
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
    };
  }
  ngOnInit(): void {
  }

}
