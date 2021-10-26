import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/data/employee-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }
  get() { }
  getById(id: number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${AppConstants.apiUrl}/api/Employees/${id}`);
  }
}
