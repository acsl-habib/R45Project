import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { UserService } from "../services/authentication/user.service";
import { NotifyService } from "../services/common/notify.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private notifyService: NotifyService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //if not logged in reject i.e., return false
    //console.log(this.userService.isLogged);
    if (this.userService.isLogged) {
      if (route.data.AllowedRoles && !this.userService.roleMatch(route.data.AllowedRoles)) {
        this.notifyService.fail("Forbidden: you are not allwed to access the resource", "DISMISS");
        return false;
      }

      return true;
    }
    else {
      this.notifyService.fail("You must login to access the resource.", "DISMISS")
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }


  }
}
