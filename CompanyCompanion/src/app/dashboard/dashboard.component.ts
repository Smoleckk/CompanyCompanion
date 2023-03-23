import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  constructor(){
  }

  ngOnInit(): void {
  }
  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFont("helvetica");
    pdf.setFontSize(4);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf")
      }
    })
  }
}
