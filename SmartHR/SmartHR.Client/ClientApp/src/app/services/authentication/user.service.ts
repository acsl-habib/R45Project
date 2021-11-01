import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/authentication/role';
import { User } from 'src/app/models/authentication/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.load();
    console.log(this.user);
    this.authenticationService.getEmitter().subscribe(x => {
      if (x === "login") {
        this.load();
      }
      if (x === "logout") {
        this.user = new User();
      }
    });
  }
  get isLogged() {
    //console.log(this.user.userName);
    return this.user?.userName != null;
  }
  get userName() {
    return this.user?.userName ?? '';
  }
  get token() {
    return this.user?.accessToken ?? '';
  }
  get refreshTokenId() {
    return this.user?.refreshToken ?? '';
  }
  get expires() {
    return this.user?.expires ?? '';
  }
  get role() {
    return this.user?.role;
  }
  load() {
    this.user = this.authenticationService.currentUserValue;
    //console.log(this.user);
  }
  logout() {
    this.authenticationService.logout();
  }
  roleMatch(allowedRoles: string[]) {
    let isMatch = false;
    for (const r of allowedRoles) {
      let i = this.role?.indexOf(r);
      if (i !=undefined && i>=0) {
        isMatch = true;
        break;
      }
    }
    //console.log(`$Math: ${isMatch}`);
    return isMatch;
  }
}
