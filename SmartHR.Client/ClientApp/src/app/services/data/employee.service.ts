import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/data/employee-model';
import { ImagePath } from '../../models/data/viewmodel/image-path';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployee(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${AppConstants.apiUrl}/api/Employees`);
  }
  getEmployeeById(id:number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${AppConstants.apiUrl}/api/Employees/${id}`);
  }
  postEmployee(data:EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${AppConstants.apiUrl}/api/Employees`,data);
  }
  putEmployee(data: EmployeeModel): Observable<any> {
    return this.http.put<EmployeeModel>(`${AppConstants.apiUrl}/api/Employees/${data.employeeId}`, data);
  }
  deleteEmployee(id:number): Observable<EmployeeModel> {
    return this.http.delete<EmployeeModel>(`${AppConstants.apiUrl}/api/Employees/${id}`);
  }

  // for upload image
  upload(id: number, f: File): Observable<ImagePath> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePath>(`${AppConstants.apiUrl}/api/Employees/Uploads/${id}`, formData);
  }
}
