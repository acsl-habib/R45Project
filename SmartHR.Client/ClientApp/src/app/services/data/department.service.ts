import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../models/data/department-model';
import { DepartmentInputModel } from '../../models/data/inputmodel/department-input-model';
import { SectionModel } from '../../models/data/section-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }
  getDepartment(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${AppConstants.apiUrl}/api/Departments`);
  }
  getDepartmentById(id: number): Observable<DepartmentModel> {
    return this.http.get<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}`);
  }
  getByIdWithSections(id: number): Observable<DepartmentModel> {
    return this.http.get<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}/WithSections`);
  }
  getWithSection(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${AppConstants.apiUrl}/api/Departments/WithSections`);
  }
  getSection(): Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(`${AppConstants.apiUrl}/api/Departments/getSection`);
  }
  createDepartment(data: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments`, data);
  }
  createWithSection(data: DepartmentInputModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/WithSection`, data);
  }
  updateDepartment(data: DepartmentModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Departments/existing/${data.departmentId}`, data);
  }
  updateWithSections(data: DepartmentInputModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Departments/${data.departmentId}/WithSections`, data);
  }
  deleteDepartment(id: number): Observable<DepartmentModel> {
    return this.http.delete<DepartmentModel>(`${AppConstants.apiUrl}/api/Departments/${id}`);
  }
}
