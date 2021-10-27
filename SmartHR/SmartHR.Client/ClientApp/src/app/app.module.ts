import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/common/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { HomeComponent } from './components/home/home.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatImportModule } from './modules/common/mat-import/mat-import.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifyService } from './services/common/notify.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/authentication/user.service';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from './services/settings.service';
import { JwtTokenInterceptor } from './interceptors/common/jwt-token-interceptor';
import { CompanyService } from './services/data/company.service';
import { BusinessDayService } from './services/data/business-day.service';
import { WorkHourService } from './services/data/work-hour.service';

/* Time picker depency */
import { MatTimepickerModule } from 'mat-timepicker';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DepartmentService } from './services/data/department.service';
import { DepartmentViewComponent } from './components/departmet/department-view/department-view.component';
import { DepartmentCreateComponent } from './components/departmet/department-create/department-create.component';
import { DepartmentEditComponent } from './components/departmet/department-edit/department-edit.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeService } from './services/data/employee.service';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { MatNativeDateModule } from '@angular/material/core';
import { GradeViewComponent } from './components/grade/grade-view/grade-view.component';
import { GradeCreateComponent } from './components/grade/grade-create/grade-create.component';
import { GradeEditComponent } from './components/grade/grade-edit/grade-edit.component';
import { SalaryHeadViewComponent } from './components/salaryhead/salary-head-view/salary-head-view.component';
import { SalaryHeadCreateComponent } from './components/salaryhead/salary-head-create/salary-head-create.component';
import { SalaryHeadEditComponent } from './components/salaryhead/salary-head-edit/salary-head-edit.component';
import { SalaryHeadService } from './services/data/salary-head.service';
import { GradeService } from './services/data/grade.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ConfirmDialogComponent,
    SettingsComponent,
    LoginComponent,
    DepartmentViewComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    EmployeeCreateComponent,
    EmployeeViewComponent,
    EmployeeEditComponent,
    GradeViewComponent,
    GradeCreateComponent,
    GradeEditComponent,
    SalaryHeadViewComponent,
    SalaryHeadCreateComponent,
    SalaryHeadEditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialMultilevelMenuModule,
    MatImportModule,
    MatTimepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    DatePipe,
    DecimalPipe,
    MultilevelMenuService,
    NotifyService,
    AuthenticationService,
    UserService,
    SettingsService,
    CompanyService,
    BusinessDayService,
    WorkHourService,
    DepartmentService,
    EmployeeService,
    SalaryHeadService,
    GradeService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
