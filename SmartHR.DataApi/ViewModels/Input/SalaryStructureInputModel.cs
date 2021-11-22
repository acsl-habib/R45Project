﻿using SmartHR.DataApi.Models.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.ViewModels.Input
{
    public class SalaryStructureInputModel
    {
        [Required, StringLength(20)]
        public string Label { get; set; }
        [Required]
        public decimal HeadValue { get; set; }
        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType ValueCalculationType { get; set; } 
    }
}
