using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Models.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Data.Models
{
    /*
     * Top levels
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
    public class WorkHour
    {
        public int WorkHourId { get; set; }

        [Required, EnumDataType(typeof(OfficeHourType))]
        public OfficeHourType OfficeHourType { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan StartTime { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan LeaveTime { get; set; }
        [Required, Column(TypeName = "time")]
        public TimeSpan BreakTime { get; set; }
        [Required]
        public int BreakDuration { get; set; }
        
    }
    
    /*
     * Asssocited entities
     * 
     * */
    public class Department
    {
        public Department()
        {
            //this.Employees = new List<Employee>();
            this.Sections = new List<Section>();
        }
        public int DepartmentId { get; set; }
        [Required, StringLength(40), Display(Name = "Name")]
        public string DepartmentName { get; set; }
        //navigation
        public virtual ICollection<Section> Sections { get; set; }

    }
    public class Section
    {
        public Section()
        {
            this.Employees = new List<Employee>();
        }
        public int SectionId { get; set; }
        [Required, StringLength(40)]
        public string SectionName { get; set; }
        //FK
        [Required, ForeignKey("Department")]
        public int DepartmentId { get; set; }
        //navigation
        public virtual Department Department { get; set; }
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

        
        public virtual ICollection<Employee> Employees { get; set; }
    }
    public class Grade
    {
        public Grade()
        {

            
            this.Employees = new List<Employee>();
            this.SalaryStructures = new List<SalaryStructure>();
        }
        public int GradeId { get; set; }
        [Required, StringLength(30)]
        public string GradeName { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal Basic { get; set; }
        //navigation
        public virtual ICollection<SalaryStructure> SalaryStructures { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }

    }
    public class SalaryHead
    {
        public SalaryHead() { this.SalaryStructures = new List<SalaryStructure>(); }
        public int SalaryHeadId { get; set; }
        [Required, StringLength(15)]
        public string SalaryHeadName { get; set; }
        [StringLength(100)]
        public string Description { get; set; }
        public bool IsCommon { get; set; }
        //navigation
        public virtual ICollection<SalaryStructure> SalaryStructures { get; set; }
    }
    public class SalaryStructure
    {
        public int SalaryStructureId { get; set; }
        public double HeadValue { get; set; }
        [Required, EnumDataType(typeof(CalculationType))]
        public CalculationType ValueCalculationType { get; set; }
        //FK
        [Required, ForeignKey("Grade")]
        public int GradeId { get; set; }
        [Required, ForeignKey("SalaryHead")]
        public int SalaryHeadId { get; set; }
        //navigation
        public virtual Grade Grade { get; set; }
        public virtual SalaryHead SalaryHead { get; set; }
    }
    public class Attendance
    {
        public int AttendanceId { get; set; }
        [Required, ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        [Required]
        public DateTime InTime { get; set; }
        public DateTime? OutTime { get; set; }

        //navigation
        public virtual Employee Employee { get; set; }
        
    }
    public class Employee
    {
        public Employee()
        {
            this.Attendances = new List<Attendance>();
            
        }
        public int EmployeeId { get; set; }
        [Required, StringLength(40)]
        public string EmployeeName { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime DateOfBirth { get; set; }
        [Required, StringLength(150)]
        public string PresentAddress { get; set; }
        [Required, StringLength(150)]
        public string PermanentAddress { get; set; }
        [Required, EnumDataType(typeof(Gender))]
        public Gender Gender { get; set; }
        [Required, EnumDataType(typeof(MaritalStatus))]
        public MaritalStatus MaritalStatus { get; set; }
        [Required, StringLength(20)]
        public string Phone { get; set; }
        [Required, StringLength(50)]
        public string Email { get; set; }
        [Required, StringLength(15)]
        public string BloodGroup { get; set; }
        [Required]
        public string Picture { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime JoiningDate { get; set; }
        [Required, EnumDataType(typeof(EmployeeStatus))]
        public EmployeeStatus EmployeeStatus { get; set; }

        // foreign key
        [Required, ForeignKey("Grade")]
        public int CurrentGradeId { get; set; }
        [Required, ForeignKey("Designation")]
        public int CurrentDesignationId { get; set; }
        [Required, ForeignKey("Section")]
        public int SectionId { get; set; }
        //navigation
        public virtual Grade Grade { get; set; }
        public virtual Designation Designation { get; set; }
        public virtual Section Section { get; set; }
        public virtual ICollection<Attendance> Attendances { get; set; }
        
    }
    //public class Salary 
    //{ 
    //    public int SalaryId { get; set; }
    //    [Required]
    //    public int Year { get; set; }
    //    [Required,StringLength(20)]
    //    public string Month { get; set; }
    //    [Required,Column(TypeName ="money"),Display(Name ="Basic Salary")]
    //    public decimal Basic { get; set; }
    //    public int EmployeeId { get; set; }

    //    //public decimal HouseRent { get; set; }
    //    //public decimal TravelAllowance { get; set; }
    //    //public decimal MedicalAllow { get; set; }
    //    //public decimal DearnessAllowance { get; set; }

    //}
    public class SalaryPay
    {
        public int SalaryPayId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        [Required, Column(TypeName ="date")]
        public DateTime PaymentDate { get; set; }
    }
    public class HRDbContext : DbContext
    {
        public HRDbContext(DbContextOptions<HRDbContext> options) : base(options) { }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Workday> WorkDays { get; set; }
        public DbSet<WorkHour> WorkHours { get; set; }
        public DbSet<SalaryHead> SalaryHeads { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<SalaryStructure> SalaryStructures { get; set; }
        public DbSet<SalaryPay> SalaryPays { get; set; }
    }
}
