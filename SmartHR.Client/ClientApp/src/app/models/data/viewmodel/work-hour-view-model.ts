import { OfficeHourType } from "../constants/enum-data";

export class WorkHourViewModel {
  constructor(
    public workHourId?: number,
    public officeHourType?: OfficeHourType,
    public startTime?: Date | string,
    public leaveTime?: Date | string,
    public breakTime?: Date | string,
    public breakDuration?: number
  ) { }
}
