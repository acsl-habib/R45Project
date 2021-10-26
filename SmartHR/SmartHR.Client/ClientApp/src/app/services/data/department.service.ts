import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../models/data/department-model';
import { EmployeeModel } from '../../models/data/employee-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${AppConstants.apiUrl}/api/Departments`);
  }
  getById(id: number): Observable<DepartmentModel> {
    return this.http.get<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}`);
  }
  getEmployee(id: number): Observable<EmployeeModel[]> {
    return this.http.get < EmployeeModel[] > (`${AppConstants.apiUrl}/api/Departments/${id}/Employees`)
  }
  create(data: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments`, data);
  }
  update(data: DepartmentModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Departments/${data.departmentId}`, data);
  }
  delete(id: number): Observable<DepartmentModel> {
    return this.http.delete<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}`);
  }
}
