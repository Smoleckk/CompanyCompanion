import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from 'src/app/service/invoice.service';
import { CreateProductPopupComponent } from '../create-product-popup/create-product-popup.component';
import { UpdateProductPopupComponent } from '../update-product-popup/update-product-popup.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(private service: InvoiceService, private dialog: MatDialog) {
    this.LoadProducts();
  }
  productData: any;
  dataSource: any;
  displayedColumns: string[] = ['code', 'name', 'price','category','remarks','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  LoadProducts() {
    this.service.GetProducts().subscribe(data => {
      this.productData = data;
      this.dataSource = new MatTableDataSource(this.productData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  UpdateProduct(code: any) {
    const popup = this.dialog.open(UpdateProductPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        code: code
      }
    })
    popup.afterClosed().subscribe(() => {
      this.LoadProducts();
    })
  }
  CreateProduct(){
    const popup = this.dialog.open(CreateProductPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
    })
    popup.afterClosed().subscribe(() => {
      this.LoadProducts();
    })
  }
}
