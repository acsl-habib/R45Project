import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DepartmentCreateComponent } from './components/departmet/department-create/department-create.component';
import { DepartmentEditComponent } from './components/departmet/department-edit/department-edit.component';
import { DepartmentViewComponent } from './components/departmet/department-view/department-view.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { GradeCreateComponent } from './components/grade/grade-create/grade-create.component';
import { GradeEditComponent } from './components/grade/grade-edit/grade-edit.component';
import { GradeViewComponent } from './components/grade/grade-view/grade-view.component';

import { HomeComponent } from './components/home/home.component';
import { SalaryHeadCreateComponent } from './components/salaryhead/salary-head-create/salary-head-create.component';
import { SalaryHeadEditComponent } from './components/salaryhead/salary-head-edit/salary-head-edit.component';
import { SalaryHeadViewComponent } from './components/salaryhead/salary-head-view/salary-head-view.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {path:'login', component:LoginComponent},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { AllowedRoles: ['Admin'] } },
  { path: "departments", component: DepartmentViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "department-edit/:id", component: DepartmentEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "department-create", component: DepartmentCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "employees", component: EmployeeViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "employee-create", component: EmployeeCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "employee-edit/:id", component: EmployeeEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "salary-heads", component: SalaryHeadViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin", "Staff"] } },
  { path: "salary-head-create", component: SalaryHeadCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "salary-head-edit/:id", component: SalaryHeadEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "grades", component: GradeViewComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "grade-create", component: GradeCreateComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } },
  { path: "grade-edit/:id", component: GradeEditComponent, canActivate: [AuthGuard], data: { AllowedRoles: ["Admin"] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
