import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionModel } from '../../models/data/section-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private http: HttpClient) { }
  get(): Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(`${AppConstants.apiUrl}/api/Sections`);
  }
  getById(id: number): Observable<SectionModel> {
    return this.http.get<SectionModel>(`${AppConstants.apiUrl}/api/Sections/${id}`);
  }
  getByEmployeeId(id: number): Observable<SectionModel> {
    return this.http.get<SectionModel>(`${AppConstants.apiUrl}/api/Sections/Employee/${id}`);
  }
}

