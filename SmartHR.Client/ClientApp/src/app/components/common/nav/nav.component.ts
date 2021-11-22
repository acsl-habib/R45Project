import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstants } from '../../../settings/app-constants';
import { UserService } from '../../../services/authentication/user.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  timerId: any;
  appName: string = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );
  appitems = AppConstants.navItems;
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
   
    /*listBackgroundColor: `rgb(208, 241, 239)`,*/
    fontColor: `rgb(8, 54, 71)`,
   /* backgroundColor: `rgb(208, 241, 239)`,*/
    selectedListFontColor: `red`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: true,
    rtlLayout: false
  };
  get isLoggedIn() {
    return this.userService.isLogged;
  }
  get userName() {
    return this.userService.userName;
  }
  logout() {
    this.userService.logout();
    this.clearTimer();
    console.log(new Date(this.userService.expires));
  }
  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService,
    private authenticationService: AuthenticationService) {
    this.appName = AppConstants.appName;
    this.authenticationService.loginEvent
      .subscribe(x => {
        if (x == "login") {
          this.setTimer()
        }
        if (x == "refresh") {
          this.clearTimer();
          this.setTimer();
        }
      });
    
  }
  setTimer() {
    
    if (this.userService.isLogged) {
      let x = Math.abs(new Date().valueOf() - new Date(this.userService.user?.expires as Date)?.valueOf());
      console.log(new Date());
      console.log(new Date(this.userService.user?.expires as Date));
      console.log(x-60000 );
      this.timerId = setTimeout(() => {
        console.log('timer');
        this.authenticationService.refreshToken(this.userService.refreshTokenId);
      }, x-60000);
    }
    
  }
  clearTimer() {
    clearTimeout(this.timerId);
  }
  ngOnInit() {
    if (this.userService.isLogged) {
      this.setTimer();
    }
  }
}
