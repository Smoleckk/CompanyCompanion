import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './invoice/invoice-create/invoice-create.component';
import { AuthGuard } from './shared/auth.guard';
import { ProformaCreateComponent } from './proforma/proforma-create/proforma-create.component';
import { ProformaListComponent } from './proforma/proforma-list/proforma-list.component';
import { AboutComponent } from './pages/about/about.component';
import { RoleGuard } from './shared/role.guard';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard-info',
    component: DashboardInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-list', component: UserListComponent, canActivate: [RoleGuard] },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  {
    path: 'invoice-list',
    component: InvoiceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-invoice',
    component: CreateInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-invoice/:invoiceId',
    component: CreateInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice-from-proforma/:proformaId',
    component: CreateInvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'proforma-list',
    component: ProformaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-proforma',
    component: ProformaCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-proforma/:proformaId',
    component: ProformaCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-list',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer/:customerId',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
