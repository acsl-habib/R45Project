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

import { HomeComponent } from './components/home/home.component';
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
  { path: "grades", component: GradeCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
