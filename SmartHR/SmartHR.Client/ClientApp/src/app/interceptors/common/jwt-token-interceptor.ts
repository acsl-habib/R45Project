import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/authentication/user.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let notoken = req.headers.get('notoken');
    if (notoken == null && this.userService.isLogged) {
      let token = this.userService.token;
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
