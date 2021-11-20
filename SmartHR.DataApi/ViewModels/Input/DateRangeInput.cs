using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.ViewModels.Input
{
    public class DateRangeInput
    {
        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
