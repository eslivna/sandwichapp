import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.user$.getValue()) {
      if (this.authService.isAdmin) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
    // Retain the attempted URL for redirection
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}
