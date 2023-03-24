import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { ProformaService } from '../../service/proforma.service';

@Component({
  selector: 'app-proforma-print-popup',
  templateUrl: './proforma-print-popup.component.html',
  styleUrls: ['./proforma-print-popup.component.scss']
})
export class ProformaPrintPopupComponent {
  @ViewChild('content', { static: false }) el!: ElementRef

  constructor(private builder: FormBuilder, private service: ProformaService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<ProformaPrintPopupComponent>) {
  }
  editdata: any;
  ngOnInit(): void {
    if (this.data.code != null && this.data.code != '') {
      this.service.GetProformaHeaderByCode(this.data.code).subscribe(res => {
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