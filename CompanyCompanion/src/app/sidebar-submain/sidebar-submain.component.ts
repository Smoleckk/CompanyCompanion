import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserProfile } from '../models/userProfile';
import { AuthService } from '../service/auth.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-sidebar-submain',
  templateUrl: './sidebar-submain.component.html',
  styleUrls: ['./sidebar-submain.component.scss'],
})
export class SidebarSubmainComponent implements OnInit {
  isDarkTheme: boolean;
  roleAdmin = false;
  username: string;
  sliceUsername: string;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private profileService: ProfileService,
    private translocoService: TranslocoService,
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
  ngOnInit(): void {
    this.getUsername();
  }

  ngDoCheck(): void {
    if (this.authService.haveAccess()) {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
  }
  sidebarOptions = [
    {
      routerLink: 'invoice-list',
      icon: 'insert_drive_file',
      translationKey: 'sidebar.invoices',
    },
    {
      routerLink: 'proforma-list',
      icon: 'description',
      translationKey: 'sidebar.proforma',
    },
    {
      routerLink: 'invoice-correct-list',
      icon: 'summarize',
      translationKey: 'sidebar.corrections',
    },
    {
      routerLink: 'product-list',
      icon: 'build',
      translationKey: 'sidebar.products',
    },
    {
      routerLink: 'customer-list',
      icon: 'perm_identity',
      translationKey: 'sidebar.customers',
    },
    {
      routerLink: 'user-list',
      icon: 'supervisor_account',
      translationKey: 'sidebar.co-workers',
    },
    {
      routerLink: 'invoice-review',
      icon: 'file_copy',
      translationKey: 'sidebar.review',
    },
    {
      routerLink: 'dashboard',
      icon: 'dashboard',
      translationKey: 'sidebar.dashboard',
    },
  ];

  clearLocal():void {
    localStorage.removeItem('token');
  }
  canActivate():void {
    if (this.authService.haveAccess()) {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
  }

  toogleTheme():void {
    this.isDarkTheme = !this.isDarkTheme;
    this.cookieService.set('isDarkTheme', this.isDarkTheme.toString(), 365);
  }
  getCookieTheme():string {
    return this.cookieService.get('isDarkTheme');
  }
  getCookieLanguage():string {
    return this.cookieService.get('language');
  }

  getUsername():void {
    this.profileService.getProfile().subscribe((profile: UserProfile) => {
      if (profile != null) {
        this.username = profile.username;
        this.sliceUsername = profile.username.slice(0, 2).toUpperCase();
      }
    });
  }
}
