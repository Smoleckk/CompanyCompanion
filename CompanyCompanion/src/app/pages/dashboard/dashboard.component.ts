import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/service/chart.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private chartService: ChartService) {}

  chartData: any;

  labelData: any;
  // realData:any[]=[];
  realData: any;

  chart: any = [];
  ngOnInit(): void {
    this.chartService.GetChartInvoiceData().subscribe((result) => {
      this.chartData = result;
      if (this.chartData != null) {
        this.labelData = this.chartData.map(
          (invo: any) => invo.invoiceChartName
        );
        this.realData = this.chartData.map((invo: any) => invo.invoiceChartSum);

      }

      this.renderChart(this.labelData, this.realData,'bar','barchart');
      this.renderChart(this.labelData, this.realData,'pie','piechart');

    });
  }

  renderChart(labelData: any, realData: any,type:any,id:any) {
    this.chart = new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Invoices',
            data: realData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
