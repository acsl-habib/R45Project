import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { observable } from "rxjs";
import { Observable, pipe, throwError } from "rxjs";
import { catchError, finalize, switchMap } from "rxjs/operators";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { UserService } from "../../services/authentication/user.service";
import { NotifyService } from "../../services/common/notify.service";
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor  {
  private isTokenRefreshing: boolean = false;
  constructor(
    private authentcationService: AuthenticationService,
    private userService: UserService,
    private notifyService: NotifyService,
    private http: HttpClient,
    private router: Router
  ) { }
  private isRefreshing = false;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(req)
      .pipe(catchError((err): Observable<any> => {
        
        if (err instanceof HttpErrorResponse) {
          console.log((<HttpErrorResponse>err).status);
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              console.log('Token expired');
              return <any>{};
            case 403:
              this.authentcationService.logout();
              return <any>{};
          }
        } else {
          return throwError(err.error ||err);
        }
        return throwError(err.error || err);
      }));
        
     
  }
  
  
}

