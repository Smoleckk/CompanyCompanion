import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { NgxPrintModule } from 'ngx-print';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { Registerv2Component } from './auth/registerv2/registerv2.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CustomerPopupComponent } from './components/customer-popup/customer-popup.component';
import { DocumentProductTableComponent } from './components/document-product-table/document-product-table.component';
import { FormFieldDataPickerComponent } from './components/form-field-data-picker/form-field-data-picker.component';
import { FormFieldSelectComponent } from './components/form-field-select/form-field-select.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsPopupComponent } from './components/forms-popup/forms-popup.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TableactionbuttonComponent } from './components/table/tableactionbutton/tableactionbutton.component';
import { TablecolumnComponent } from './components/table/tablecolumn/tablecolumn.component';
import { TablecontentComponent } from './components/table/tablecontent/tablecontent.component';
import { TableheaderComponent } from './components/table/tableheader/tableheader.component';
import { CustomerCreatePopupComponent } from './customer/customer-create-popup/customer-create-popup.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerUpdatePopupComponent } from './customer/customer-update-popup/customer-update-popup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InvoiceCorrectCreateComponent } from './invoice/correct/invoice-correct-create/invoice-correct-create.component';
import { InvoiceCorrectListComponent } from './invoice/correct/invoice-correct-list/invoice-correct-list.component';
import { InvoiceCorrectSecondPopupComponent } from './invoice/correct/invoice-correct-second-popup/invoice-correct-second-popup.component';
import { CreateInvoiceComponent } from './invoice/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoicePrintPopupComponent } from './invoice/invoice-print-popup/invoice-print-popup.component';
import { InvoicePrintSecondPopupComponent } from './invoice/invoice-print-second-popup/invoice-print-second-popup.component';
import { InvoiceReviewComponent } from './invoice/invoice-review/invoice-review.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CreateProductPopupComponent } from './product/create-product-popup/create-product-popup.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UpdateProductPopupComponent } from './product/update-product-popup/update-product-popup.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProformaCreateComponent } from './proforma/proforma-create/proforma-create.component';
import { ProformaListComponent } from './proforma/proforma-list/proforma-list.component';
import { ProformaPrintPopupComponent } from './proforma/proforma-print-popup/proforma-print-popup.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { SidebarMainComponent } from './sidebars/sidebar-main/sidebar-main.component';
import { SidebarSubmainComponent } from './sidebars/sidebar-submain/sidebar-submain.component';
import { SidebarComponent } from './sidebars/sidebar/sidebar.component';
import { TranslocoRootModule } from './transloco-root.module';
import { UpdateUserPopupComponent } from './user/update-user-popup/update-user-popup.component';
import { UserCreatePopupComponent } from './user/user-create-popup/user-create-popup.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
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
    NotFoundComponent,
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    BlogListComponent,
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
