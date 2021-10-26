import { DatePipe, WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwError, VirtualTimeScheduler } from 'rxjs';
import { BusinessDay } from 'src/app/models/data/business-day';
import { CompanyModel } from 'src/app/models/data/company-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { CompanyService } from 'src/app/services/data/company.service';
import { SettingsService } from 'src/app/services/settings.service';
import { AppConstants } from 'src/app/settings/app-constants';
import { OfficeHourType } from '../../../models/data/constants/enum-data';
import { WorkHourViewModel } from '../../../models/data/viewmodel/work-hour-view-model';
import { BusinessDayService } from '../../../services/data/business-day.service';
import { WorkHourService } from '../../../services/data/work-hour.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  dbState: boolean = false;
  InitExpanded: boolean = false;
  //company profile vars
  years: number[] = [];
  company!: CompanyModel;
  //Business day vars
  formTemplate: { id: number | null, label: string, value: any, checked: boolean }[] = [];
  businessDays: BusinessDay[] = [];
  //work hour vars
  workHourRegular: WorkHourViewModel = new WorkHourViewModel(undefined, OfficeHourType.Regular, '', '', '', 60);
  
  workHourRamadan: WorkHourViewModel = new WorkHourViewModel(undefined, OfficeHourType.Ramadan, '', '', '', 60);
  

  constructor(
    private settingsService: SettingsService,
    private companyService: CompanyService,
    private businessDayService: BusinessDayService,
    private notifyService: NotifyService,
    private workHourService: WorkHourService,
    private datePipe: DatePipe
  ) { }
  init() {
    this.settingsService.dbInit()
      .subscribe(
        r => { this.dbState = true; this.InitExpanded = false; },
        err => {
          this.notifyService.fail("Failed to get preapare status.", "DISMISS");
        }
      )
  }
  /*
   * Form submit handlers
   *
   * */
  updateCompany(f: NgForm) {

    this.companyService.updateCompany(this.company)
      .subscribe(
        r => {
          this.notifyService.success("Data updated", "DISMISS");
          f.form.markAsPristine();
          f.form.markAsUntouched();
        },
        err => {
          this.notifyService.fail("Failed to update.", "DISMISS");
          throwError(err.error || err);
        }
      )
  }
  saveBusinessDays(f: NgForm) {
    let data: BusinessDay[] = [];
    this.formTemplate.forEach(t => {
      let b = new BusinessDay(undefined, t.value, t.checked);
      data.push(b);
    });
    this.businessDayService.postArray(data)
      .subscribe(
        r => {
          this.notifyService.success("Business days saved", "DISMISS");
          f.form.markAsPristine();
        },
        err => {
          this.notifyService.fail("Failed to save company data", "DISMISS");
          throwError(err.error || err);
        }
      );
  }
  updateRegularWorkHour(f: NgForm) {
    let data = new WorkHourViewModel();

    data.officeHourType = this.workHourRegular.officeHourType;
    data.startTime = <string>this.datePipe.transform(this.workHourRegular.startTime, "yyyy-MM-ddTHH:mm", "en-US");
    data.leaveTime = <string>this.datePipe.transform(this.workHourRegular.leaveTime, "yyyy-MM-ddTHH:mm", "en-US");
    data.breakTime = <string>this.datePipe.transform(this.workHourRegular.breakTime, "yyyy-MM-ddTHH:mm", "en-US");
    data.breakDuration = this.workHourRegular.breakDuration;
    this.workHourService.save(data)
      .subscribe(r => {
        console.log(r);
      }, err => {
        this.notifyService.fail("Failed to save work hour", "DISMISS");
        throwError(err.error || err);
      });
  }
  updateRamadanWorkHour(f: NgForm) {
    let data = new WorkHourViewModel();

    data.officeHourType = this.workHourRamadan.officeHourType;
    data.startTime = <string>this.datePipe.transform(this.workHourRamadan.startTime, "yyyy-MM-ddTHH:mm", "en-US");
    data.leaveTime = <string>this.datePipe.transform(this.workHourRamadan.leaveTime, "yyyy-MM-ddTHH:mm", "en-US");
    data.breakTime = <string>this.datePipe.transform(this.workHourRamadan.breakTime, "yyyy-MM-ddTHH:mm", "en-US");
    data.breakDuration = this.workHourRamadan.breakDuration;
    this.workHourService.save(data)
      .subscribe(r => {
        console.log(r);
      }, err => {
        this.notifyService.fail("Failed to save ramadan work hour", "DISMISS");
        throwError(err.error || err);
      });
  }
  /*
   * Methods
   *
   * */
  prepareData() {
    //load company data
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
    //load work hour data
    //console.log(OfficeHourType.Regular);
    this.workHourService.getByType(OfficeHourType.Regular)
      .subscribe(r => {
        //console.log(r);
        if (r.length > 0) {
          this.workHourRegular.workHourId = r[0].workHourId;
          this.workHourRegular.officeHourType = r[0].officeHourType;
          this.workHourRegular.startTime = new Date(<string>r[0].startTime);
          this.workHourRegular.leaveTime = new Date(<string>r[0].leaveTime);
          this.workHourRegular.breakTime = new Date(<string>r[0].breakTime);
          this.workHourRegular.breakDuration = r[0].breakDuration;
        }
       
        
      }, err => {
        this.notifyService.fail("Failed to load rgular office hour", "DISMISS");
        throwError(err.error || err);
      });
    this.workHourService.getByType(OfficeHourType.Ramadan)
      .subscribe(r => {
        //console.log(r);
        if (r.length > 0) {
          this.workHourRamadan.workHourId = r[0].workHourId;
          this.workHourRamadan.officeHourType = r[0].officeHourType;
          this.workHourRamadan.startTime = new Date(<string>r[0].startTime);
          this.workHourRamadan.leaveTime = new Date(<string>r[0].leaveTime);
          this.workHourRamadan.breakTime = new Date(<string>r[0].breakTime);
          this.workHourRamadan.breakDuration = r[0].breakDuration;
        }


      }, err => {
        this.notifyService.fail("Failed to load rgular office hour", "DISMISS");
        throwError(err.error || err);
      });
     /*
      * Populate business days array from WeekDay enum
      *
      * */
    Object.keys(WeekDay).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.formTemplate.push({ id: null, label: v, value: WeekDay[v], checked: false });
    });
    this.businessDayService.get()
      .subscribe(
        r => {
          this.businessDays = r;
          console.log(r);
          this.businessDays.forEach(d => {
            let day = this.formTemplate.find(f => f.value == d.weekday);
            if (day) day.checked = d.isOn as boolean;
          });
        },
        err => {
          this.notifyService.fail("Failed to load business day data", "DISMISS");
          throwError(err.error || err);
        }
      );
  }
  ngOnInit(): void {
    this.workHourRegular.leaveTime = new Date();
    console.log(this.workHourRegular)
    let thisYear = new Date().getFullYear();
    for (let year = thisYear; year >= 1970; year--) {
      this.years.push(year);
    }
    this.settingsService.getDbStatus()
      .subscribe(
        r => {
          this.dbState = r;
          if (this.dbState) this.prepareData();
        },
        err => {
          this.notifyService.fail("Failed to get database status.", "DISMISS");
        }
      );
    
  }

}
