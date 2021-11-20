import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessDay } from 'src/app/models/data/business-day';
import { AppConstants } from 'src/app/settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class BusinessDayService {

  constructor(private http: HttpClient) { }
  get(): Observable<BusinessDay[]> {
    return this.http.get<BusinessDay[]>(`${AppConstants.apiUrl}/api/Workdays`);
  }
  postArray(data: BusinessDay[]): Observable<any> {
    return this.http.post(`${AppConstants.apiUrl}/api/Workdays/Bulk`, data)
  }
}
