import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  displaymenu=false;
  isDarkTheme:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route:Router) {}


  ngDoCheck(): void {
    if (this.route.url == '/login' || this.route.url == '/register' || this.route.url == '/welcome' ) {
      this.displaymenu = false
    } else {
      this.displaymenu = true
    }
  }  
  hideMenu:boolean = true;

  HideMenu(){
    this.hideMenu=!this.hideMenu;
  }

}
