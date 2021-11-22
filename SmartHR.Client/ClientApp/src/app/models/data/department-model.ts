import { SectionModel } from "./section-model";
export interface DepartmentModel {

  departmentId?: number;
  departmentName?: string;
  sections?: SectionModel[];
}
