using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.ViewModels.Edit
{
    public class GradeEditModel
    {
        
        public int GradeId { get; set; }
        [Required, StringLength(30)]
        public string GradeName { get; set; }
        [Required]
        public decimal Basic { get; set; }
        public  SalaryStructureEditModel[] SalaryStructures { get; set; }
    }
}
