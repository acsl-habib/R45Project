﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SmartHR.DataApi.Models.Data;

namespace SmartHR.DataApi.Migrations.Data
{
    [DbContext(typeof(HRDbContext))]
    partial class HRDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Attendance", b =>
                {
                    b.Property<int>("AttendanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("InTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("OutTime")
                        .HasColumnType("datetime2");

                    b.HasKey("AttendanceId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DepartmentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("DepartmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Designation", b =>
                {
                    b.Property<int>("DesignationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("DesignationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("DesignationId");

                    b.ToTable("Designations");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BloodGroup")
                        .IsRequired()
                        .HasColumnType("nvarchar(15)")
                        .HasMaxLength(15);

                    b.Property<int>("CurrentDesignationId")
                        .HasColumnType("int");

                    b.Property<int>("CurrentGradeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBith")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("EmployeeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.Property<int>("EmployeeStatus")
                        .HasColumnType("int");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<DateTime>("JoiningDate")
                        .HasColumnType("date");

                    b.Property<int>("MaritalStatus")
                        .HasColumnType("int");

                    b.Property<string>("PermanentAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(150)")
                        .HasMaxLength(150);

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PresnetAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(150)")
                        .HasMaxLength(150);

                    b.Property<int>("SectionId")
                        .HasColumnType("int");

                    b.HasKey("EmployeeId");

                    b.HasIndex("CurrentDesignationId");

                    b.HasIndex("CurrentGradeId");

                    b.HasIndex("SectionId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Grade", b =>
                {
                    b.Property<int>("GradeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Basic")
                        .HasColumnType("money");

                    b.Property<string>("GradeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("GradeId");

                    b.ToTable("Grades");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.OfficeHourType", b =>
                {
                    b.Property<int>("OfficeHourTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("OfficeHourTypeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("OfficeHourTypeId");

                    b.ToTable("OfficeHourTypes");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.SalaryHead", b =>
                {
                    b.Property<int>("SalaryHeadId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<bool>("IsCommon")
                        .HasColumnType("bit");

                    b.Property<string>("SalaryHeadName")
                        .IsRequired()
                        .HasColumnType("nvarchar(15)")
                        .HasMaxLength(15);

                    b.HasKey("SalaryHeadId");

                    b.ToTable("SalaryHeads");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.SalaryStructure", b =>
                {
                    b.Property<int>("SalaryStructureId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GradeId")
                        .HasColumnType("int");

                    b.Property<double>("HeadValue")
                        .HasColumnType("float");

                    b.Property<int>("SalaryHeadId")
                        .HasColumnType("int");

                    b.Property<int>("ValueCalculationType")
                        .HasColumnType("int");

                    b.HasKey("SalaryStructureId");

                    b.HasIndex("GradeId");

                    b.HasIndex("SalaryHeadId");

                    b.ToTable("SalaryStructures");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Section", b =>
                {
                    b.Property<int>("SectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("SectionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("SectionId");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.WorkHour", b =>
                {
                    b.Property<int>("WorkHourId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BreakDuration")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("BreakTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("LeaveTime")
                        .HasColumnType("time");

                    b.Property<int>("OfficeHourTypeId")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.HasKey("WorkHourId");

                    b.HasIndex("OfficeHourTypeId");

                    b.ToTable("WorkHours");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Workday", b =>
                {
                    b.Property<int>("WorkdayId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsOn")
                        .HasColumnType("bit");

                    b.Property<int>("Weekday")
                        .HasColumnType("int");

                    b.HasKey("WorkdayId");

                    b.ToTable("WorkDays");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Attendance", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Data.Employee", "Employee")
                        .WithMany("Attendances")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Employee", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Data.Designation", "Designation")
                        .WithMany("Employees")
                        .HasForeignKey("CurrentDesignationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartHR.DataApi.Models.Data.Grade", "Grade")
                        .WithMany("Employees")
                        .HasForeignKey("CurrentGradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartHR.DataApi.Models.Data.Section", "Section")
                        .WithMany("Employees")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.SalaryStructure", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Data.Grade", "Grade")
                        .WithMany("SalaryStructures")
                        .HasForeignKey("GradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartHR.DataApi.Models.Data.SalaryHead", "SalaryHead")
                        .WithMany("SalaryStructures")
                        .HasForeignKey("SalaryHeadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.Section", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Data.Department", "Department")
                        .WithMany("Sections")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Data.WorkHour", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Data.OfficeHourType", "OfficeHourType")
                        .WithMany("WorkHours")
                        .HasForeignKey("OfficeHourTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
