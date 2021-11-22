import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel } from 'src/app/models/data/company-model';
import { AppConstants } from 'src/app/settings/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http:HttpClient
  ) { }
  getInfo(key:string):Observable<CompanyModel>{
    let params: any = {'accessKey': key};
    //console.log(params);
    return this.http.get<CompanyModel>(`${AppConstants.apiUrl}/api/Companies/Info`, {params:params});
  }
  updateCompany(data:CompanyModel):Observable<any>{
    return this.http.put(`${AppConstants.apiUrl}/api/Companies/${data.companyId}`, data);
  }
}
