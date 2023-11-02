import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { CreateProductPopupComponent } from '../create-product-popup/create-product-popup.component';
import { UpdateProductPopupComponent } from '../update-product-popup/update-product-popup.component';
import { ProductService } from 'src/app/service/product.service';
import { ProductMagazine } from 'src/app/models/productMagazine';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private readonly translocoService: TranslocoService
  ) {}

  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'name',
    'price',
    'category',
    'remarks',
    'action',
  ];
  columns: any = [
    {
      matColumnDef: 'name',
      matHeaderCellDef: this.translocoService.translate(
        'productTableHeader.name'
      ),
      matCellDef: 'name',
    },
    {
      matColumnDef: 'price',
      matHeaderCellDef: this.translocoService.translate(
        'productTableHeader.price'
      ),
      matCellDef: 'price',
    },
    {
      matColumnDef: 'category',
      matHeaderCellDef: this.translocoService.translate(
        'productTableHeader.category'
      ),
      matCellDef: 'category',
    },
    {
      matColumnDef: 'remarks',
      matHeaderCellDef: this.translocoService.translate(
        'productTableHeader.remarks'
      ),
      matCellDef: 'remarks',
    },
  ];
  actionButtons = [
    {
      color: 'primary',
      icon: 'edit',
      function: (element: any) => this.updateProduct(element.productMagazineId),
    },
    {
      color: 'warn',
      icon: 'delete',
      function: (element: any) => this.removeProduct(element.productMagazineId),
    },
  ];

  ngOnInit(): void {
    this.loadProducts();
    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['name', 'price', 'action'];
    } else {
      this.displayedColumns = [
        'name',
        'price',
        'category',
        'remarks',
        'action',
      ];
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: ProductMagazine[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  removeProduct(code: string): void {
    if (
      confirm(this.translocoService.translate('toaster.toasterConfirm') + code)
    ) {
      this.productService.deleteProduct(code).subscribe(() => {
        this.toastrService.success(
          this.translocoService.translate('toaster.toasterDeletedSuccess')
        );
        this.loadProducts();
      });
    }
  }
  updateProduct(productMagazineId: string): void {
    const popup = this.dialog.open(UpdateProductPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '700px',
      data: { productMagazineId },
    });

    popup.afterClosed().subscribe(() => {
      this.loadProducts();
    });
  }
  createProduct(): void {
    const popup = this.dialog.open(CreateProductPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '700px',
    });

    popup.afterClosed().subscribe(() => {
      this.loadProducts();
    });
  }
}
