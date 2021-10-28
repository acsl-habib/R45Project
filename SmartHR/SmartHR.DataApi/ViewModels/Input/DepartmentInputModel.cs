using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.ViewModels.Input
{
    public class DepartmentInputModel
    {
        public int DepartmentId { get; set; }
        [Required, StringLength(40)]
        public string DepartmentName { get; set; }
        public string[] Sections { get; set; }
    }
}
