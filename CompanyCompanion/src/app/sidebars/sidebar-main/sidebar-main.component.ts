import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar-main',
  templateUrl: './sidebar-main.component.html',
  styleUrls: ['./sidebar-main.component.scss'],
})
export class SidebarMainComponent {
  hideMenu: boolean = true;
  constructor(
    private translocoService: TranslocoService,
    private cookieService: CookieService
  ) {
    if (this.getCookieLanguage() == 'en') {
      this.translocoService.setActiveLang(this.getCookieLanguage());
    }
    if (this.getCookieLanguage() == 'pl') {
      this.translocoService.setActiveLang(this.getCookieLanguage());
    } else {
      this.cookieService.set('language', 'en', 365);
      this.translocoService.setActiveLang('en');
    }
  }
  getCookieLanguage(): string {
    return this.cookieService.get('language');
  }
  HideMenu() {
    this.hideMenu = !this.hideMenu;
  }
}
