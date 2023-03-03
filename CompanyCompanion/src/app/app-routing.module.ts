import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "user-list", component: UserListComponent, canActivate: [AuthGuard] },
  { path: "product-list", component: ProductListComponent, canActivate: [AuthGuard] },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "invoice-list", component: InvoiceListComponent, canActivate: [AuthGuard] },
  { path: "create-invoice", component: CreateInvoiceComponent, canActivate: [AuthGuard] },
  { path: "edit-invoice/:invoiceno", component: CreateInvoiceComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
