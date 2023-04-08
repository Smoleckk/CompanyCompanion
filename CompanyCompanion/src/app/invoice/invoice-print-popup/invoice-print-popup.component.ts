import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-print-popup',
  templateUrl: './invoice-print-popup.component.html',
  styleUrls: ['./invoice-print-popup.component.scss'],
})
export class InvoicePrintPopupComponent implements OnInit {
  @ViewChild('content', { static: false }) private content!: ElementRef;
  public editdata: any;

  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<InvoicePrintPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.code) {
      this.service.GetInvByCode(this.data.code).subscribe((res) => {
        console.log(res);
        this.editdata = res;
      });
    }
  }

  public makePdf(): void {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFont('helvetica');
    pdf.setFontSize(4);
    pdf.html(this.content.nativeElement, {
      callback: (pdf) => {
        pdf.save('sample.pdf');
      },
    });
  }
}
