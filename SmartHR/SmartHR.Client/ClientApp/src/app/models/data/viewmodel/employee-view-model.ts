import { EmployeeStatus, Gender, MaritalStatus } from "../constants/enum-data";
import { DepartmentModel } from "../department-model";
import { DesignationModel } from "../designation-model";
import { GradeModel } from "../grade-model";
import { SectionModel } from "../section-model";

export interface EmployeeViewModel {
  employeeId?: number;
  employeeName?: string;
  dateOfBirth?: Date;
  presentAddress?: string,
  permanentAddress?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  phone?: string;
  email?: string;
  bloodGroup?: string;
  picture?: string;
  currentGradeId?: number;
  joinDate?: Date;
  employeeStatus?: EmployeeStatus;
  departmentId?: number;
  currentDesignationId?: number;
  employeeTypeId?: number;
  
}
