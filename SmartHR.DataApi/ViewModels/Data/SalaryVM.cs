using SmartHR.DataApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.ViewModels.Data
{
  
    public class SalaryVM
    {
        
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public decimal Basic { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int WorkingDays { get; set; }
        public string Grade { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public decimal HR {
            get { return (Basic / 100) * 40; }
        }
        public decimal MA {
            get { return (Basic / 100) * 30; }
        }
        public decimal TA
        {
            get { return 500; }
        }
        public decimal DA
        {
            get { return 300; }
        }
        public decimal GrossSalary { 
           get { return Basic + HR + MA + TA + DA; }
        }
        public decimal Tax
        {
            get { return (Basic / 100) * 10; }
        }
        public decimal Deduction
        {
            get { return Tax; }
        }
        public decimal NetSalary
        {
            get
            {
                return GrossSalary - Deduction;
            }
        }


        

    }
}
