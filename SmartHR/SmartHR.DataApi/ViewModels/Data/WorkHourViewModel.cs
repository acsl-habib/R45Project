using SmartHR.DataApi.Models.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.ViewModels.Data
{
    public class WorkHourViewModel
    {
        public int WorkHourId { get; set; }
        public OfficeHourType OfficeHourType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime LeaveTime { get; set; }

        public DateTime BreakTime { get; set; }

        public int BreakDuration { get; set; }
    }
}
