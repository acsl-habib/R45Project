import { EmployeeStatus, Gender, MaritalStatus } from "./constants/enum-data";

export interface EmployeeModel {
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
  joiningDate?: Date;
  employeeStatus?: EmployeeStatus;
  sectionId?: number;
  currentDesignationId?: number;
  employeeTypeId?: number;
  departmentId?: number;
}
