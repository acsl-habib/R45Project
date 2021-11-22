import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { CompanyModel } from './models/data/company-model';
import { NotifyService } from './services/common/notify.service';
import { CompanyService } from './services/data/company.service';
import { AppConstants } from './settings/app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ClientApp';
  //model
  company!: CompanyModel;
  constructor(
    private companyService: CompanyService,
    private notifyService: NotifyService
  ) { }
  ngOnInit() {
    this.companyService.getInfo(AppConstants.companyKey)
      .subscribe(
        r => {
          this.company = r;
          console.log(r);
        },
        err => {
          this.notifyService.fail("Failed to load company data", "DISMISS");
          throwError(err.error || err);
        }

      );
  }
}

