import { CalculationType } from "../data/constants/enum-data";

export interface SalaryStructureInputModel {
  label?: string;
  headValue?: number;
  valueCalculationType?: CalculationType
}
