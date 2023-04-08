import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router) {}

  canActivate() {
    if (this.service.haveAccess()) {
      return true;
    } else {
      this.route.navigate(['']);
      return false;
    }
  }
}
