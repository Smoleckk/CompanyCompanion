import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../service/profile.service';
import { UserProfile } from '../models/userProfile';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  displaymenu = false;
  isDarkTheme: any;
  roleAdmin = false;
  username: any;
  sliceUsername: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private translocoService: TranslocoService,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {

    if (this.getCookieTheme() == 'false') {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme = true;
    }
    if (this.getCookieLanguage() == 'en') {
      this.translocoService.setActiveLang(this.getCookieLanguage());
    }
    if (this.getCookieLanguage() == 'pl') {
      this.translocoService.setActiveLang(this.getCookieLanguage());
    } else {
      this.cookieService.set('language', 'en', 365);
      this.translocoService.setActiveLang('en');
      // this.router.navigate(['/']);
    }
  }

  ngDoCheck(): void {
    if (
      this.route.url == '/login' ||
      this.route.url == '/register' ||
      this.route.url == '/welcome'
    ) {
      this.displaymenu = false;
    } else {
      this.displaymenu = true;
    }
    if (this.authService.haveAccess()) {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
  }
  sidebarOptions = [
    { routerLink: 'invoice-list', icon: 'insert_drive_file', translationKey: 'sidebar.invoices' },
    { routerLink: 'proforma-list', icon: 'description', translationKey: 'sidebar.proforma' },
    { routerLink: 'invoice-correct-list', icon: 'summarize', translationKey: 'sidebar.corrections' },
    { routerLink: 'product-list', icon: 'build', translationKey: 'sidebar.products' },
    { routerLink: 'customer-list', icon: 'perm_identity', translationKey: 'sidebar.customers' },
    { routerLink: 'user-list', icon: 'supervisor_account', translationKey: 'sidebar.co-workers' },
    { routerLink: 'invoice-review', icon: 'file_copy', translationKey: 'sidebar.review' },
    { routerLink: 'dashboard', icon: 'dashboard', translationKey: 'sidebar.dashboard' },
  ];

  
  hideMenu: boolean = true;

  HideMenu() {
    this.hideMenu = !this.hideMenu;
  }
  clearLocal() {
    localStorage.removeItem('token');
  }
  canActivate() {
    if (this.authService.haveAccess()) {
      this.roleAdmin = true;
    // this.getUsername();

    } else {
      this.roleAdmin = false;
    }
  }

  toogleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.cookieService.set('isDarkTheme', this.isDarkTheme.toString(), 365);
  }
  getCookieTheme() {
    return this.cookieService.get('isDarkTheme');
  }
  getCookieLanguage() {
    return this.cookieService.get('language');
  }

  getUsername() {
    this.profileService.getProfile().subscribe((profile: UserProfile) => {
      if (profile != null) {
        this.username = profile.username;
        this.sliceUsername = profile.username.slice(0, 2).toUpperCase();
      }
    });
  }
}
