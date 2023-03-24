import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './invoice/invoice-create/invoice-create.component';
import { AuthGuard } from './shared/auth.guard';
import { ProformaCreateComponent } from './proforma/proforma-create/proforma-create.component';
import { ProformaListComponent } from './proforma/proforma-list/proforma-list.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "user-list", component: UserListComponent, canActivate: [AuthGuard] },
  { path: "product-list", component: ProductListComponent, canActivate: [AuthGuard] },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "invoice-list", component: InvoiceListComponent, canActivate: [AuthGuard] },
  { path: "create-invoice", component: CreateInvoiceComponent, canActivate: [AuthGuard] },
  { path: "edit-invoice/:invoiceId", component: CreateInvoiceComponent, canActivate: [AuthGuard] },
  { path: "invoice-from-proforma/:proformaId", component: CreateInvoiceComponent, canActivate: [AuthGuard] },
  { path: "proforma-list", component: ProformaListComponent, canActivate: [AuthGuard] },
  { path: "create-proforma", component: ProformaCreateComponent, canActivate: [AuthGuard] },
  { path: "edit-proforma/:proformaId", component: ProformaCreateComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
