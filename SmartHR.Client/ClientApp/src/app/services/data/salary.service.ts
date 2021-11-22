import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { SalaryPayModel } from '../../models/data/salary-pay-model';
import { SalaryViewModel } from '../../models/data/viewmodel/salary-view-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }
  get(): Observable<SalaryViewModel[]> {
    return this.http.get<SalaryViewModel[]>(`${AppConstants.apiUrl}/api/Salary/salary`)
  }
  IsSaved(y: number, m: number): Observable<boolean> {
    return this.http.get<boolean>(`${AppConstants.apiUrl}/api/SalaryPays/Status/${y}/${m}`);
  }
  getPayDate(y: number, m: number): Observable<Date> {
    return this.http.get<Date>(`${AppConstants.apiUrl}/api/SalaryPays/Date/${y}/${m}`);
  }
  save(data: SalaryPayModel): Observable<SalaryPayModel> {
    return this.http.post<SalaryPayModel>(`${AppConstants.apiUrl}/api/SalaryPays`, data);
  }
}
