import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  displaymenu = false;
  notFound = false;

  constructor(private route: Router, private authService: AuthService) {}

  ngDoCheck(): void {
    if (this.authService.haveAccess()) {
      this.displaymenu = true;
    } else {
      this.displaymenu = false;
    }
      if (
    this.route.url == '/login' ||
    this.route.url == '/register' ||
    this.route.url == '/about' ||
    this.route.url == '/blog' ||
    this.route.url == '/welcome'
  ) {
    this.displaymenu = false;
  }
  }

}
