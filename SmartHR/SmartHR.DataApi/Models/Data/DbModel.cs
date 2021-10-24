using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Models.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using SmartHR.DataApi.Models.Data;

namespace SmartHR.DataApi.Models.Data
{
    /*
     * Standalone entity
     * 
     * */
    public class Company
    {
        public int CompanyId { get; set; }
        [Required, StringLength(40), Display(Name = "Company Name")]
        public string CompanyName { get; set; }
        [StringLength(60), Display(Name = "Company Motto")]
        public string CompanySlogan { get; set; }
        [Display(Name = "Established")]
        public int? CompanyEstablishYear { get; set; }
        [StringLength(200)]
        public string CompanyAddress { get; set; }
        [StringLength(20), Display(Name = "Phone")]
        public string CompanyPhone { get; set; }
        [StringLength(50), Display(Name = "Email"), EmailAddress]
        public string CompanyMail { get; set; }

        [StringLength(150), Display(Name = "Company Website")]
        public string CompanyWebUrl { get; set; }
        [Required, StringLength(150)]
        public string AccessKey { get; set; }
    }
    public class Workday
    {
        public int WorkdayId { get; set; }
        [Required, EnumDataType(typeof(DayOfWeek))]
        public DayOfWeek Weekday { get; set; }
        [Required]
        public bool IsOn { get; set; }
    }
    public class OfficeHourType
    {
        public int OfficeHourTypeId { get; set; }
        [Required, StringLength(40)]
        public string OfficeHourTypeName { get; set; }
    }
    public class WorkHour
    {
        public int WorkHourId { get; set; }

        [Required, ForeignKey("OfficeHourType")]
        public int OfficeHourTypeId { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan StartTime { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan LeaveTime { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan BreakTime { get; set; }
        [Required]
        public int BreakDuration { get; set; }
        public virtual OfficeHourType OfficeHourType { get; set; }
    }
    /*
     * Asssocited entities
     * 
     * */
    public class Department
    {
        public Department()
        {
            this.Employees = new List<Employee>();
        }
        public int DepartmentId { get; set; }
        [Required, StringLength(40), Display(Name = "Name")]
        public string DepartmentName { get; set; }
        //navigation
        public virtual ICollection<Employee> Employees { get; set; }

    }
    public class Designation
    {
        public Designation()
        {
            //this.EmployeeDesignationHistories = new List<EmployeeDesignationHistory>();
            this.Employees = new List<Employee>();
        }
        public int DesignationId { get; set; }
        [Required, StringLength(40), Display(Name = "Designation Name")]
        public string DesignationName { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        //public virtual ICollection<EmployeeDesignationHistory> EmployeeDesignationHistories { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
    public class Grade
    {
        public Grade()
        {

            //this.EmployeeGradeHistories = new List<EmployeeGradeHistory>();
            this.Employees = new List<Employee>();
            //this.Steps = new List<Step>();
        }
        public int GradeId { get; set; }
        [Required, StringLength(30)]
        public string GradeName { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal Basic { get; set; }

        // Allowance Column
        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType HouseRentType { get; set; }
        [Required, Display(Name = "House Rent"), Column(TypeName = "money")]
        public decimal HouseRent { get; set; }

        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType MedicalAllowanceType { get; set; }
        [Required, Display(Name = "Medical Allowance"), Column(TypeName = "money")]
        public decimal MedicalAllowance { get; set; }

        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType DearnessAllowanceType { get; set; }
        [Required, Display(Name = "Dearness Allowance"), Column(TypeName = "money")]
        public decimal DearnessAllowance { get; set; }


        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType TravelAllowanceType { get; set; }
        [Required, Display(Name = "Travel Allowance"), Column(TypeName = "money")]
        public decimal TravelAllowance { get; set; }

        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType BonusType { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal Bonus { get; set; }

        //deduction

        [Required, EnumDataType(typeof(CalculationType)), Display(Name = "Provident Fund Type")]
        public CalculationType ProvidentFundType { get; set; }
        [Required, Display(Name = "Provident Fund"), Column(TypeName = "money")]
        public decimal ProvidentFund { get; set; }

        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType IncomeTaxType { get; set; }
        [Required, Display(Name = "Income Tax"), Column(TypeName = "money")]
        public decimal IncomeTax { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        //public virtual ICollection<EmployeeGradeHistory> EmployeeGradeHistories { get; set; }
       

    }
    public class EmployeeType
    {
        public EmployeeType()
        {
            this.Employees = new List<Employee>();

        }
        public int EmployeeTypeId { get; set; }
        [Required, StringLength(40)]
        public string EmployeeTypeName { get; set; }
        [Required, Display(Name = "Number of Leave Per Month")]
        public int NumberOfLeavePerMonth { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }

    }
    public class Employee
    {
        public Employee()
        {
            this.LeaveApplications = new List<LeaveApplication>();
            this.Attendances = new List<Attendance>();
        }
        public int EmployeeId { get; set; }
        [Required, StringLength(50), Display(Name = "Employee Name")]
        public string EmployeeName { get; set; }
        [Required, Column(TypeName = "date"), Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }
        [Required, StringLength(200), Display(Name = "Present Address")]
        public string PresentAddress { get; set; }
        [Required, StringLength(200), Display(Name = "Permanent Address")]
        public string PermanentAddress { get; set; }
        [Required, EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }
        [Required, EnumDataType(typeof(MaritalStatus)), Display(Name = "Maritial Status")]
        public MaritalStatus MaritalStatus { get; set; }
        [Required, StringLength(20)]
        public string Phone { get; set; }
        [Required, EmailAddress, StringLength(50)]
        public string Email { get; set; }
        [Required, StringLength(15), Display(Name = "Blood Group")]
        public string BloodGroup { get; set; }
        [StringLength(250)]
        public string Picture { get; set; }
        //job details
        [Required, ForeignKey("Grade")]
        public int CurrentGradeId { get; set; }
        [Required, Column(TypeName = "date"), Display(Name = "Joining Date")]
        public DateTime JoiningDate { get; set; }
        [Required, EnumDataType(typeof(EmployeeStatus))]
        public EmployeeStatus EmployeeStatus { get; set; }

        [Required, ForeignKey("Department")]
        public int DepartmentId { get; set; }
        [Required, ForeignKey("Designation")]
        public int CurrentDesignationId { get; set; }
        [Required, ForeignKey("EmployeeType")]
        public int EmployeeTypeId { get; set; }

        //navigation
        public virtual Department Department { get; set; }


        public virtual EmployeeType EmployeeType { get; set; }


        public virtual Designation Designation { get; set; }

        public virtual Grade Grade { get; set; }
        //Child side
        public virtual ICollection<LeaveApplication> LeaveApplications { get; set; }
        public virtual ICollection<Attendance> Attendances { get; set; }
    }
    public class LeaveType
    {
        public LeaveType()
        {
            this.LeaveApplications = new List<LeaveApplication>();
        }
        public int LeaveTypeId { get; set; }
        [Required, StringLength(10)]
        public string LeaveCode { get; set; }
        [Required, StringLength(30)]
        public string LeaveTypeName { get; set; }
        [Required]
        public int MaxDays { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
        public virtual ICollection<LeaveApplication> LeaveApplications { get; set; }

    }
    public class LeaveApplication
    {
        public int LeaveApplicationId { get; set; }
        [Required, ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        [Required, ForeignKey("LeaveType")]
        public int LeaveTypeId { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime DateApplied { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime FromDate { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime ToDate { get; set; }
        [Required, EnumDataType(typeof(LeaveStatus))]
        public LeaveStatus Status { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual LeaveType LeaveType { get; set; }
    }
    public class Attendance
    {
        public int AttendanceId { get; set; }
        [Required, ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan InTime { get; set; }
        [Column(TypeName = "time")]
        public TimeSpan? OutTime { get; set; }
        public virtual Employee Employee { get; set; }
    }
    public class HRDbContext : DbContext
    {
        public HRDbContext(DbContextOptions<HRDbContext> options) : base(options)
        {
        }
        /* stanalones */
        public DbSet<Company> Companies { get; set; }
        public DbSet<Workday> Workdays { get; set; }
        public DbSet<WorkHour> WorkHours { get; set; }
        /* Associated */
        public DbSet<Department> Departments { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<EmployeeType> EmployeeTypes { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<LeaveApplication> LeaveApplications { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
    }
}
