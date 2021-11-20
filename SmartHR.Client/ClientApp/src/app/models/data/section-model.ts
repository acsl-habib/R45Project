import { DepartmentModel } from "./department-model";

export interface SectionModel {
  sectionId?: number;
  sectionName?: string;
  departmentId?: number;
  department?: DepartmentModel
}
