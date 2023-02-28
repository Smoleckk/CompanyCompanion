import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/material.module';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserPopupComponent } from './update-user-popup/update-user-popup.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component'

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
    CreateInvoiceComponent
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
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
