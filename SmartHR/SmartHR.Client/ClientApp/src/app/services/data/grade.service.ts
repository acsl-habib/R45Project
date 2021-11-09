import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeEditModel } from '../../models/data/edit/grade-edit-model';
import { EmployeeModel } from '../../models/data/employee-model';
import { GradeModel } from '../../models/data/grade-model';
import { SalaryStructureInputModel } from '../../models/data/inputmodel/salary-structure-input-model';
import { EmployeeViewModel } from '../../models/data/viewmodel/employee-view-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<GradeModel[]> {
    return this.http.get<GradeModel[]>(`${AppConstants.apiUrl}/api/Grades`);
  }
  getInclude(): Observable<GradeModel[]> {
    return this.http.get<GradeModel[]>(`${AppConstants.apiUrl}/api/Grades/Include`);
  }
  getById(id: number): Observable<GradeModel> {
    return this.http.get<GradeModel>(`${AppConstants.apiUrl}/api/Grades/${id}`);
  }
  getByIdForEdit(id: number): Observable<GradeEditModel> {
    return this.http.get<GradeEditModel>(`${AppConstants.apiUrl}/api/Grades/${id}/Edit`);
  }
  getEmployees(id: number /* grade id*/): Observable<EmployeeViewModel[]> {
    return this.http.get<EmployeeViewModel[]>(`${AppConstants.apiUrl}/api/Grades/${id}/Employees`);
  }
  create(data: GradeModel): Observable<GradeModel> {
    return this.http.post<GradeModel>(`${AppConstants.apiUrl}/api/Grades`, data);
  }
  update(data: GradeModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Grades/${data.gradeId}`, data);
  }
  delete(id: number): Observable<GradeModel> {
    return this.http.delete<GradeModel>(`${AppConstants.apiUrl}/api/Grades/${id}`);
  }
  saveSalaryStructure(id: number, data: SalaryStructureInputModel[]): Observable<any> {
    return this.http.post<any>(`${AppConstants.apiUrl}/api/Grades/${id}/Array`, data);
  }
  
}
