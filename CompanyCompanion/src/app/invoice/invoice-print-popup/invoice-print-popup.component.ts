import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-print-popup',
  templateUrl: './invoice-print-popup.component.html',
  styleUrls: ['./invoice-print-popup.component.scss']
})
export class InvoicePrintPopupComponent {
  @ViewChild('content', { static: false }) el!: ElementRef

  constructor(private builder: FormBuilder, private service: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<InvoicePrintPopupComponent>) {
  }
  editdata: any;
  ngOnInit(): void {
    console.log(this.data.code);
    
    if (this.data.code != null && this.data.code != '') {
      this.service.GetInvByCode(this.data.code).subscribe(res => {
        console.log(res);
        this.editdata = res;
      })
    }
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