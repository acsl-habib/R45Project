import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';



import { LoginModel } from '../../models/authentication/login-model';
import { User } from '../../models/authentication/user';
import { AppConstants } from '../../settings/app-constants';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
 
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("user-data") as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  login(data: LoginModel) {
    let noTokenHeader = { headers: new HttpHeaders({ 'notoken': 'no token' }) }
    return this.http.post<any>(`${AppConstants.apiUrl}/api/Account/Login`, data, noTokenHeader)
      .pipe(map(data => {
        let user = this.save(data);
        this.currentUserSubject.next(user);

        this.loginEvent.emit('login');
        
      }),
        catchError((err, caught) => {

          this.currentUserSubject.next(new User());
          return throwError(err);
        }));
  }
  refreshToken(id: string) {
    //RefreshToken/{id}
    console.log(`${AppConstants.apiUrl}/api/Account/RefreshToken/${id}`)
    let noTokenHeader = { headers: new HttpHeaders({ 'notoken': 'no token' }) }
    return this.http.post(`${AppConstants.apiUrl}/api/Account/RefreshToken/${id}`, null)
      .subscribe(x => {
        console.log(x);
        let user = this.save(x);
        this.currentUserSubject.next(user);
        this.loginEvent.emit('refresh');
       
      });
    
  }
  logout() {
    sessionStorage.removeItem("user-data");
    this.currentUserSubject.next(new User());
    this.loginEvent.emit('logout');
   
  }
  save(data: any): User {
    console.log(data);
    const userdata = new User();
    userdata.accessToken = data.token;
    const payload = JSON.parse(window.atob(data.token.split('.')[1]));
    userdata.userName = payload.username;
    userdata.role = payload.role.split(",");
    userdata.refreshToken = data.refreshToken;
    userdata.expires = data.expiration;
    sessionStorage.setItem("user-data", JSON.stringify(userdata));
    
    return userdata;
  }
  getEmitter() {
    return this.loginEvent;
  }
  
  
}
