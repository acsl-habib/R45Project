import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstants } from '../../../settings/app-constants';
import { UserService } from '../../../services/authentication/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
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
  }
  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) { this.appName = AppConstants.appName; }

}
