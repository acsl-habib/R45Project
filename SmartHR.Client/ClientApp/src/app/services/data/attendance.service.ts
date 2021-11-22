import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceImportModel } from '../../models/data/attendance-import-model';
import { DateRangeInputModel } from '../../models/data/inputmodel/date-range-input-model';
import { AppConstants } from '../../settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(
    private http: HttpClient
  ) { }
  saveImported(data: any[]): Observable<any> {
    return this.http.post<any>(`${AppConstants.apiUrl}/api/Attendances/Bulk`, data);
  }
  getAttendancesOfDataRange(data: DateRangeInputModel): Observable<AttendanceImportModel[]> {
    return this.http.post<AttendanceImportModel[]>(`${AppConstants.apiUrl}/api/Attendances/OfDate`, data);
  }
}
