import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficeHourType } from '../../models/data/constants/enum-data';
import { WorkHourViewModel } from '../../models/data/viewmodel/work-hour-view-model';
import { AppConstants } from '../../settings/app-constants';


@Injectable({
  providedIn: 'root'
})
export class WorkHourService {

  constructor(
    private http: HttpClient
  ) { }
  getByType(t: OfficeHourType): Observable<WorkHourViewModel[]> {
    return this.http.get<WorkHourViewModel[]>(`${AppConstants.apiUrl}/api/WorkHours/VM/${t}`);
  }
  save(w: WorkHourViewModel): Observable<WorkHourViewModel> {
    console.log(w);
    return this.http.post<WorkHourViewModel>(`${AppConstants.apiUrl}/api/WorkHours/Alt`, w);
  }
}
