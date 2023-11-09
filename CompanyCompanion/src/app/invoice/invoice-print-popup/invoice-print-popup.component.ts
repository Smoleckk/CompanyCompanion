import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from 'src/app/models/invoice';
import { UserProfile } from 'src/app/models/userProfile';
import { ProfileService } from 'src/app/service/profile.service';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-print-popup',
  templateUrl: './invoice-print-popup.component.html',
  styleUrls: ['./invoice-print-popup.component.scss'],
})
export class InvoicePrintPopupComponent implements OnInit {
  @ViewChild('content', { static: false }) private content!: ElementRef;
  public editData: Invoice;
  public profileInfo: UserProfile;
  public groupedProducts: any;
  public arrayGroupedProducts: any;
  public totalNettoSum: number = 0;
  public totalVatSum: number = 0;
  public totalBruttoSum: number = 0;

  constructor(
    private service: InvoiceService,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.code) {
      this.service.getInvByCode(this.data.code).subscribe((res) => {
        this.editData = res;

        this.groupedProducts = this.editData.products.reduce(
          (
            acc: {
              has: (arg0: any) => any;
              set: (
                arg0: any,
                arg1: { vat: any; nettoSum: any; vatSum: any; bruttoSum: any }
              ) => void;
              get: (arg0: any) => {
                nettoSum: any;
                vatSum: any;
                bruttoSum: any;
              };
            },
            curr: { vat: any; nettoPrice: any; bruttoPrice: any }
          ) => {
            const { vat, nettoPrice, bruttoPrice } = curr;
            if (!acc.has(vat)) {
              acc.set(vat, {
                vat,
                nettoSum: nettoPrice,
                vatSum: (nettoPrice * vat) / 100,
                bruttoSum: nettoPrice + (nettoPrice * vat) / 100,
              });
            } else {
              const { nettoSum, vatSum, bruttoSum } = acc.get(vat);
              acc.set(vat, {
                vat,
                nettoSum: nettoSum + nettoPrice,
                vatSum: vatSum + (nettoPrice * vat) / 100,
                bruttoSum: bruttoSum + nettoPrice + (nettoPrice * vat) / 100,
              });
            }
            return acc;
          },
          new Map()
        );
        this.arrayGroupedProducts = Array.from(this.groupedProducts.entries());
        this.arrayGroupedProducts.forEach((element: any) => {
          this.totalNettoSum += element[1].nettoSum;
          this.totalBruttoSum += element[1].bruttoSum;
          this.totalVatSum += element[1].vatSum;
        });
      });
    }
  }

  // public makePdf(): void {
  //   const pdf = new jsPDF('p', 'pt', 'a4');
  //   pdf.setFont('helvetica');
  //   pdf.setFontSize(4);
  //   pdf.html(this.content.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save('sample.pdf');
  //     },
  //   });
  // }

  /*
Generowanie pliku pdf, ale jest to ss
*/
  makePdf(): void {
    const contentElement = this.content.nativeElement;
    const w = contentElement.offsetWidth;
    const h = contentElement.offsetHeight;

    html2canvas(contentElement, {
      scale: 3,
    }).then((canvas: any) => {
      const img = canvas.toDataURL('image/jpeg', 1);
      const doc = new jsPDF('p', 'px', [w, h]);
      doc.addImage(img, 'JPEG', 0, 0, w, h);
      // doc.autoPrint();
      // doc.output('dataurlnewwindow');
      doc.save('Faktura_' + this.editData.invoiceNo + '.pdf');
    });
  }
}
