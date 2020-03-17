import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent implements OnChanges {
  @Input() labels: string[];
  @Input() data: number[];
  @Input() labelGraph: string;
  @Input() color = 'black';
  @Input() backgroundColor?: string;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];
  lineChartLegend;
  lineChartType: ChartType;
  lineChartPlugins;

  constructor() {
    this.lineChartOptions = {
      responsive: true,
    };
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.lineChartPlugins = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lineChartData = [
      {data: this.data, label: this.labelGraph}
    ];
    this.lineChartLabels = this.labels;

    this.lineChartColors = [
      {
        borderColor: this.color,
        backgroundColor: this.backgroundColor
      }
    ];
  }
}
