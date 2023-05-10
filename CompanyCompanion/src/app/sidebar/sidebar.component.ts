import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../service/profile.service';
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
    private cookieService: CookieService,
    private profileService: ProfileService
  ) {
    this.getUsername()

    if (this.getCookie() == 'false') {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme = true;
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

  toogleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.cookieService.set('isDarkTheme', this.isDarkTheme.toString());
  }
  getCookie() {
    const isDarkThemeCookie = this.cookieService.get('isDarkTheme');
    return isDarkThemeCookie;
  }

  getUsername() {
    this.profileService.getProfile().subscribe((res) => {
      let editData: any;
      editData = res;
      if (editData != null) {
        this.username = editData.username;
        this.sliceUsername = editData.username.slice(0,2).toUpperCase()
      }
    });
  }
}
