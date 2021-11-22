import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { AttendanceImportComponent } from './components/attendance/attendance-import/attendance-import.component';
import { AttendanceViewComponent } from './components/attendance/attendance-view/attendance-view.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { DepartmentViewComponent } from './components/department/department-view/department-view.component';
import { DesignationCreateComponent } from './components/designation/designation-create/designation-create.component';
import { DesignationEditComponent } from './components/designation/designation-edit/designation-edit.component';
import { DesignationEmployeeComponent } from './components/designation/designation-employee/designation-employee.component';
import { DesignationViewComponent } from './components/designation/designation-view/designation-view.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { GradeCreateComponent } from './components/grade/grade-create/grade-create.component';
import { GradeEditComponent } from './components/grade/grade-edit/grade-edit.component';
import { GradeEmployeeComponent } from './components/grade/grade-employee/grade-employee.component';
import { GradeViewComponent } from './components/grade/grade-view/grade-view.component';
import { HomeComponent } from './components/home/home.component';
import { SalaryViewComponent } from './components/salary-view/salary-view.component';
import { SalaryHeadCreateComponent } from './components/salaryhead/salary-head-create/salary-head-create.component';
import { SalaryHeadEditComponent } from './components/salaryhead/salary-head-edit/salary-head-edit.component';
import { SalaryHeadViewComponent } from './components/salaryhead/salary-head-view/salary-head-view.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { AllowedRoles: ['Admin'] } },
  { path: "departments", component: DepartmentViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "department-edit/:id", component: DepartmentEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "department-create", component: DepartmentCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "employees", component: EmployeeViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "employee-create", component: EmployeeCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "employee-edit/:id", component: EmployeeEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "employee-details/:id", component: EmployeeDetailsComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "salary-heads", component: SalaryHeadViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "salary-head-create", component: SalaryHeadCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "salary-head-edit/:id", component: SalaryHeadEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "grades", component: GradeViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin","Staff"] } },
  { path: "grade-create", component: GradeCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "grade-edit/:id", component: GradeEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "grade-employees/:id", component: GradeEmployeeComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] }  },
  { path: "designations", component: DesignationViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "designation-create", component: DesignationCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "designation-edit/:id", component: DesignationEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "designation-employees/:id", component: DesignationEmployeeComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "attendance", component: AttendanceViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "attendance-import", component: AttendanceImportComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "salary", component: SalaryViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin","Staff"] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
