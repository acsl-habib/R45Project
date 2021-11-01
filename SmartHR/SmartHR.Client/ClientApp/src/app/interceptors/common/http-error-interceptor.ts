import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { UserService } from "../../services/authentication/user.service";
import { NotifyService } from "../../services/common/notify.service";
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor  {
  constructor(
    private authentcationService: AuthenticationService,
    private userService: UserService,
    private notifyService: NotifyService,
    private http: HttpClient
  ) { }
  private isRefreshing = false;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(err => {
        
        if (err.status === 401) {
          if (this.userService.isLogged) this.authentcationService.logout();
          this.notifyService.fail("Token expired", "DISMISS");
          return next.handle(req);
        }
        if (err.status == 403) {
          // auto logout if 401 or 403 response returned from api
          if (this.userService.isLogged)
            this.authentcationService.logout();
          
          
        }
        return throwError(err.error || err);
      }));
  }
  
}

