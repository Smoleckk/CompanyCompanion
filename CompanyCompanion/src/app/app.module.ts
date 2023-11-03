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
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './auth/register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UpdateUserPopupComponent } from './user/update-user-popup/update-user-popup.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './invoice/invoice-create/invoice-create.component';
import { NgxPrintModule } from 'ngx-print';
import * as $ from 'jquery';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UpdateProductPopupComponent } from './product/update-product-popup/update-product-popup.component';
import { CreateProductPopupComponent } from './product/create-product-popup/create-product-popup.component';
import { InvoicePrintPopupComponent } from './invoice/invoice-print-popup/invoice-print-popup.component';
import { ProformaListComponent } from './proforma/proforma-list/proforma-list.component';
import { ProformaCreateComponent } from './proforma/proforma-create/proforma-create.component';
import { ProformaPrintPopupComponent } from './proforma/proforma-print-popup/proforma-print-popup.component';
import { AboutComponent } from './pages/about/about.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerCreatePopupComponent } from './customer/customer-create-popup/customer-create-popup.component';
import { UserCreatePopupComponent } from './user/user-create-popup/user-create-popup.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { CustomerUpdatePopupComponent } from './customer/customer-update-popup/customer-update-popup.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { InvoicePrintSecondPopupComponent } from './invoice/invoice-print-second-popup/invoice-print-second-popup.component';
import { InvoiceReviewComponent } from './invoice/invoice-review/invoice-review.component';
import { CookieService } from 'ngx-cookie-service';
import { InvoiceCorrectListComponent } from './invoice/correct/invoice-correct-list/invoice-correct-list.component';
import { InvoiceCorrectCreateComponent } from './invoice/correct/invoice-correct-create/invoice-correct-create.component';
import { InvoiceCorrectSecondPopupComponent } from './invoice/correct/invoice-correct-second-popup/invoice-correct-second-popup.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { TableheaderComponent } from './components/table/tableheader/tableheader.component';
import { TableactionbuttonComponent } from './components/table/tableactionbutton/tableactionbutton.component';
import { TablecolumnComponent } from './components/table/tablecolumn/tablecolumn.component';
import { TablecontentComponent } from './components/table/tablecontent/tablecontent.component';
import { CustomerPopupComponent } from './components/customer-popup/customer-popup.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsPopupComponent } from './components/forms-popup/forms-popup.component';
import { Registerv2Component } from './auth/registerv2/registerv2.component';
import { TranslocoRootModule } from './transloco-root.module';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { FormFieldSelectComponent } from './components/form-field-select/form-field-select.component';
import { FormFieldDataPickerComponent } from './components/form-field-data-picker/form-field-data-picker.component';
import { DocumentProductTableComponent } from './components/document-product-table/document-product-table.component';
import { SidebarMainComponent } from './sidebar-main/sidebar-main.component';
import { SidebarSubmainComponent } from './sidebar-submain/sidebar-submain.component';
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
    WelcomeComponent,
    CustomerListComponent,
    CustomerCreatePopupComponent,
    UserCreatePopupComponent,
    CustomerDetailsComponent,
    ProfileDetailsComponent,
    CustomerUpdatePopupComponent,
    InvoicePrintSecondPopupComponent,
    InvoiceReviewComponent,
    InvoiceCorrectListComponent,
    InvoiceCorrectCreateComponent,
    InvoiceCorrectSecondPopupComponent,
    BreadcrumbComponent,
    TableheaderComponent,
    TableactionbuttonComponent,
    TablecolumnComponent,
    TablecontentComponent,
    CustomerPopupComponent,
    FormFieldComponent,
    FormsPopupComponent,
    Registerv2Component,
    LanguageSelectorComponent,
    InvoiceTableComponent,
    HomeCardComponent,
    FormFieldSelectComponent,
    FormFieldDataPickerComponent,
    DocumentProductTableComponent,
    SidebarMainComponent,
    SidebarSubmainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
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
    MatNativeDateModule,
    MatStepperModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    MatDatepickerModule,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
