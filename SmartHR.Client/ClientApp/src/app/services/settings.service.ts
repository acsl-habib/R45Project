import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http:HttpClient
  ) { }
  getDbStatus():Observable<boolean>{
    return this.http.get<boolean>(`${AppConstants.apiUrl}/api/DbMigrations/DbStatus`);
  }
  dbInit():Observable<any>{
    return this.http.post<any>(`${AppConstants.apiUrl}/api/DbMigrations/Init`, null);
  }
}
