import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesignationModel } from '../../models/data/designation-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) { }
  get(): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(`${AppConstants.apiUrl}/api/Designations`);
  }
  getById(id: number): Observable<DesignationModel> {
    return this.http.get<DesignationModel>(`${AppConstants.apiUrl}/api/Designations/${id}`);
  }
  getByEmployeeId(id: number):Observable<DesignationModel> {
    return this.http.get<DesignationModel>(`${AppConstants.apiUrl}/api/Designations/Employee/${id}`);
  }
}
