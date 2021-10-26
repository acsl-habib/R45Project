import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeModel } from '../../models/data/grade-model';
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
  
  create(data: GradeModel): Observable<GradeModel> {
    return this.http.post<GradeModel>(`${AppConstants.apiUrl}/api/Grades`, data);
  }
  update(data: GradeModel): Observable<any> {
    return this.http.put<any>(`${AppConstants.apiUrl}/api/Grades/${data.gradeId}`, data);
  }
  delete(id: number): Observable<GradeModel> {
    return this.http.delete<GradeModel>(`${AppConstants.apiUrl}/api/Grades/${id}`);
  }
}
