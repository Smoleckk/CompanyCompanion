import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  displaymenu = false;
  isDarkTheme: boolean = false;
  roleAdmin = false;
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
    private cookieService: CookieService
  ) {}

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
    } else {
      this.roleAdmin = false;
    }
  }
  setCookie() {
    // console.log(this.isDarkTheme);
    this.isDarkTheme = !this.isDarkTheme;
    console.log(this.isDarkTheme);

    this.cookieService.set('isDarkTheme', this.isDarkTheme.toString());
    this.isDarkTheme = this.getCookie();
  }

  // toogleCookie() {
  //   this.isDarkTheme = false;
  //   console.log(this.isDarkTheme);
  //   this.cookieService.set('isDarkTheme', this.isDarkTheme.toString());
  //  this.isDarkTheme= this.getCookie();

  // }
  getCookie() {
    const isDarkThemeCookie = this.cookieService.get('isDarkTheme');
    return Boolean(isDarkThemeCookie);
  }
}
