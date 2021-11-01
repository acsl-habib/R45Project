import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../models/data/department-model';
import { EmployeeModel } from '../../models/data/employee-model';
import { DepartmentInputModel } from '../../models/data/inputmodel/department-input-model';
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
  getByIdWithSections(id: number): Observable<DepartmentModel> {
    return this.http.get<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}/WithSections`);
  }
  getWithSections(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${AppConstants.apiUrl}/api/Departments/WithSections`);
  }
  getEmployee(id: number): Observable<EmployeeModel[]> {
    return this.http.get < EmployeeModel[] > (`${AppConstants.apiUrl}/api/Departments/${id}/Employees`)
  }
  create(data: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments`, data);
  }
  createWithSection(data: DepartmentInputModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/WithSection`, data);
  }
  update(data: DepartmentModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Departments/${data.departmentId}`, data);
  }
  updateWithSections(data: DepartmentInputModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Departments/${data.departmentId}/WithSections`, data);
  }
  delete(id: number): Observable<DepartmentModel> {
    return this.http.delete<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}`);
  }
}
