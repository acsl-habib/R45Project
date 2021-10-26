import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalaryHeadModel } from '../../models/data/salary-head-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SalaryHeadService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<SalaryHeadModel[]> {
    return this.http.get<SalaryHeadModel[]>(`${AppConstants.apiUrl}/api/SalaryHeads`);
  }
  getById(id: number): Observable<SalaryHeadModel> {
    return this.http.get<SalaryHeadModel>(`${AppConstants.apiUrl}/api/SalaryHeads/${id}`);
  }
  getEmployee(id: number): Observable<SalaryHeadModel[]> {
    return this.http.get<SalaryHeadModel[]>(`${AppConstants.apiUrl}/api/SalaryHeads/${id}/Employees`)
  }
  create(data: SalaryHeadModel): Observable<SalaryHeadModel> {
    return this.http.post<SalaryHeadModel>(`${AppConstants.apiUrl}/api/SalaryHeads`, data);
  }
  update(data: SalaryHeadModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/SalaryHeads/${data.salaryHeadId}`, data);
  }
  delete(id: number): Observable<SalaryHeadModel> {
    return this.http.delete<SalaryHeadModel>(`${AppConstants.apiUrl}/api/SalaryHeads/${id}`);
  }
}
