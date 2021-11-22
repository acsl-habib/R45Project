import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesignationModel } from '../../models/data/designation-model';
import { EmployeeModel } from '../../models/data/employee-model';
import { EmployeeViewModel } from '../../models/data/viewmodel/employee-view-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  constructor(
    private http: HttpClient
  ) { }
  getDesignation(): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(`${AppConstants.apiUrl}/api/Designations`);
  }
  getDesignationById(id: number): Observable<DesignationModel> {
    return this.http.get<DesignationModel>(`${AppConstants.apiUrl}/api/Designations/${id}`);
  }
  getEmployees(id: number /* grade id*/): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${AppConstants.apiUrl}/api/Designations/${id}/Employees`);
  }
  createDesignation(data: DesignationModel): Observable<DesignationModel> {
    return this.http.post<DesignationModel>(`${AppConstants.apiUrl}/api/Designations`, data);
  }
  updateDesignation(data: DesignationModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Designations/${data.designationId}`, data);
  }
  deleteDesignation(id: number): Observable<DesignationModel> {
    return this.http.delete<DesignationModel>(`${AppConstants.apiUrl}/api/Designations/${id}`);
  }
}
