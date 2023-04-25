import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/service/chart.service';
import { InvoiceService } from 'src/app/service/invoice.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private chartService: ChartService,
    private invoiceService: InvoiceService
  ) {}

  chart: any = [];
  chartData: any;
  labelData: any;
  realData: any;

  productSoldSum: any;
  invoicesNumber: any;

  invoicesTotalSum: any;

  ngOnInit(): void {
    this.chartService.getInvoicePaidStatus().subscribe((result) => {
      this.chartData = result;
      if (this.chartData != null) {
        this.labelData = this.chartData.map(
          (invo: any) => invo.invoiceChartName
        );
        this.realData = this.chartData.map((invo: any) => invo.invoiceChartSum);
      }
      this.invoicesNumber = this.realData.reduce((a: any, b: any) => a + b, 0);
      this.renderChart(
        this.labelData,
        this.realData,
        'pie',
        'piechart1',
        'Invoices'
      );
    });

    this.chartService.getProductStatus().subscribe((result) => {
      this.chartData = result;
      if (this.chartData != null) {
        this.labelData = this.chartData.map(
          (invo: any) => invo.productChartName
        );
        this.realData = this.chartData.map((invo: any) => invo.productChartSum);
      }
      this.productSoldSum = this.realData.reduce((a: any, b: any) => a + b, 0);
      this.renderChart(
        this.labelData,
        this.realData,
        'bar',
        'barchart',
        'Products'
      );
    });
    this.invoiceService.GetAllInvoice().subscribe((readInvoices: any) => {
      // this.invoices.data = readInvoices;
      // console.log(readInvoices.map((invo: any) => invo.netTotal).reduce((a: any, b: any) => a + b, 0));
      this.invoicesTotalSum= readInvoices.map((invo: any) => invo.netTotal).reduce((a: any, b: any) => a + b, 0);
    });
  }

  renderChart(labelData: any, realData: any, type: any, id: any, name: any) {
    this.chart = new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [
          {
            label: name,
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
