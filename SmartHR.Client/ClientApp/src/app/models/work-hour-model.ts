import { OfficeHourType } from "./data/constants/enum-data";


export class WorkHourModel {
  constructor(
    public workHourId?: number,
    public officeHourType?: OfficeHourType,
    public startTime?: Date,
    public leaveTime?: Date,
    public breakTime?: Date,
    public breakDuration?: number
  ) { }
}
