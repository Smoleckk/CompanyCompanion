import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { InvoiceCorrectService } from 'src/app/service/invoice-correct.service';

@Component({
  selector: 'app-invoice-correct-second-popup',
  templateUrl: './invoice-correct-second-popup.component.html',
  styleUrls: ['./invoice-correct-second-popup.component.scss'],
})
export class InvoiceCorrectSecondPopupComponent implements OnInit {
  @ViewChild('content', { static: false }) private content!: ElementRef;
  public editdata: any;
  public groupedProducts: any;
  public arrayGroupedProducts: any;
  public totalNettoSum: number = 0;
  public totalVatSum: number = 0;
  public totalBruttoSum: number = 0;
  //////////
  public groupedProductsCorrectBefore: any;
  public arrayGroupedProductsCorrectBefore: any;
  public totalNettoSumCorrectBefore: number = 0;
  public totalVatSumCorrectBefore: number = 0;
  public totalBruttoSumCorrectBefore: number = 0;
  //////////

  public groupedProductsCorrectAfter: any;
  public arrayGroupedProductsCorrectAfter: any;
  public totalNettoSumCorrectAfter: number = 0;
  public totalVatSumCorrectAfter: number = 0;
  public totalBruttoSumCorrectAfter: number = 0;

  public result: any;
  constructor(
    private service: InvoiceCorrectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.code) {
      //////////////////////////
      if (this.data.code) {
        this.service.getInvByCode(this.data.code).subscribe((res) => {
          this.editdata = res;
          console.log(res);
          this.groupedProductsCorrectBefore = this.editdata.products
            .filter((_: any, index: number) => index % 2 === 0)
            .reduce(
              (
                acc: {
                  has: (arg0: any) => any;
                  set: (
                    arg0: any,
                    arg1: {
                      vat: any;
                      nettoSum: any;
                      vatSum: any;
                      bruttoSum: any;
                    }
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
                    bruttoSum:
                      bruttoSum + nettoPrice + (nettoPrice * vat) / 100,
                  });
                }
                return acc;
              },
              new Map()
            );
          this.arrayGroupedProductsCorrectBefore = Array.from(
            this.groupedProductsCorrectBefore.entries()
          );

          this.arrayGroupedProductsCorrectBefore.forEach((element: any) => {
            this.totalNettoSumCorrectBefore += element[1].nettoSum;
            this.totalBruttoSumCorrectBefore += element[1].bruttoSum;
            this.totalVatSumCorrectBefore += element[1].vatSum;
          });
        });
      }
      //////////////////////////
      this.service.getInvByCode(this.data.code).subscribe((res) => {
        this.editdata = res;
        console.log(res);

        this.groupedProductsCorrectAfter = this.editdata.products
          .filter((_: any, index: number) => index % 2 === 1)
          .reduce(
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
        this.arrayGroupedProductsCorrectAfter = Array.from(
          this.groupedProductsCorrectAfter.entries()
        );
        this.arrayGroupedProductsCorrectAfter.forEach((element: any) => {
          this.totalNettoSumCorrectAfter += element[1].nettoSum;
          this.totalBruttoSumCorrectAfter += element[1].bruttoSum;
          this.totalVatSumCorrectAfter += element[1].vatSum;
        });
        
        /////////////////////
        const result = new Map<number, any>();

        this.groupedProductsCorrectBefore.forEach(
          (
            value: { vat: any; nettoSum: any; vatSum: any; bruttoSum: any },
            key: number
          ) => {
            if (this.groupedProductsCorrectAfter.has(key)) {
              const newValue = {
                vat: value.vat + this.groupedProductsCorrectAfter.get(key).vat,
                nettoSum:
                  value.nettoSum +
                  this.groupedProductsCorrectAfter.get(key).nettoSum,
                vatSum:
                  value.vatSum +
                  this.groupedProductsCorrectAfter.get(key).vatSum,
                bruttoSum:
                  value.bruttoSum +
                  this.groupedProductsCorrectAfter.get(key).bruttoSum,
              };
              result.set(key, newValue);
            }
          }
        );
        this.result = Array.from(result.entries());
/////////////////////
      });
    }
    /////////////////////////////
    this.service.getInvByCode(this.data.code).subscribe((res) => {
      this.editdata = res;
      console.log(res);

      this.groupedProducts = this.editdata.products.reduce(
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
      this.arrayGroupedProducts = Array.from(
        this.groupedProducts.entries()
      );
      this.arrayGroupedProducts.forEach((element: any) => {
        this.totalNettoSum += element[1].nettoSum;
        this.totalBruttoSum += element[1].bruttoSum;
        this.totalVatSum += element[1].vatSum;
      });
    });
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
