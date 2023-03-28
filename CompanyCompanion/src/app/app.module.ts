import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from 'src/material.module';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './auth/register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UpdateUserPopupComponent } from './user/update-user-popup/update-user-popup.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './invoice/invoice-create/invoice-create.component'
import {NgxPrintModule} from 'ngx-print';
import * as $ from 'jquery';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UpdateProductPopupComponent } from './product/update-product-popup/update-product-popup.component';
import { CreateProductPopupComponent } from './product/create-product-popup/create-product-popup.component';
import { InvoicePrintPopupComponent } from './invoice/invoice-print-popup/invoice-print-popup.component';
import { ProformaListComponent } from './proforma/proforma-list/proforma-list.component';
import { ProformaCreateComponent } from './proforma/proforma-create/proforma-create.component';
import { ProformaPrintPopupComponent } from './proforma/proforma-print-popup/proforma-print-popup.component';
import { AboutComponent } from './pages/about/about.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent,
    UserListComponent,
    UpdateUserPopupComponent,
    InvoiceListComponent,
    CreateInvoiceComponent,
    ProductListComponent,
    UpdateProductPopupComponent,
    CreateProductPopupComponent,
    InvoicePrintPopupComponent,
    ProformaListComponent,
    ProformaCreateComponent,
    ProformaPrintPopupComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
   }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPrintModule,
    MatSlideToggleModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}, MatDatepickerModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
