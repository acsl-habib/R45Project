import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalaryStructureEditModel } from '../../models/data/edit/salary-structure-edit-model';
import { SalaryStructureModel } from '../../models/data/salary-structure-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SalaryStructureService {

  constructor(private http: HttpClient) { }
  get(): Observable<SalaryStructureModel[]> {
    return this.http.get<SalaryStructureModel[]>(`${AppConstants.apiUrl}/api/SalaryStructures`);
  }
  getById(id: number): Observable<SalaryStructureModel> {
    return this.http.get<SalaryStructureModel>(`${AppConstants.apiUrl}/api/SalaryStructures/${id}`);
  }
  create(data: SalaryStructureModel): Observable<SalaryStructureModel> {
    return this.http.post<SalaryStructureModel>(`${AppConstants.apiUrl}/api/SalaryStructures`, data);
  }

  update(data: SalaryStructureModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/SalaryStructures/${data.salaryStructureId}`, data);
  }
  updateOrCreate(id: number, data: SalaryStructureEditModel): Observable<SalaryStructureEditModel> {
    return this.http.post<SalaryStructureModel>(`${AppConstants.apiUrl}/api/SalaryStructures/${id}/EditModel`, data);
  }
  delete(id: number): Observable<SalaryStructureModel> {
    return this.http.delete<SalaryStructureModel>(`${AppConstants.apiUrl}/api/SalaryStructures/${id}`);
  }

}
