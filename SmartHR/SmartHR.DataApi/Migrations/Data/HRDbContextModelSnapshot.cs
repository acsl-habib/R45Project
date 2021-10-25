﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SmartHR.DataApi.Models;

namespace SmartHR.DataApi.Migrations.Data
{
    [DbContext(typeof(HRDbContext))]
    partial class HRDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SmartHR.DataApi.Models.Department", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.Designation", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.Grade", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.OfficeHourType", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.SalaryHead", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.SalaryStructure", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.Section", b =>
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

                    b.ToTable("Section");
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.WorkHour", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.Workday", b =>
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

            modelBuilder.Entity("SmartHR.DataApi.Models.SalaryStructure", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Grade", "Grade")
                        .WithMany("SalaryStructures")
                        .HasForeignKey("GradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartHR.DataApi.Models.SalaryHead", "SalaryHead")
                        .WithMany("SalaryStructures")
                        .HasForeignKey("SalaryHeadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.Section", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.Department", "Department")
                        .WithMany("Sections")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartHR.DataApi.Models.WorkHour", b =>
                {
                    b.HasOne("SmartHR.DataApi.Models.OfficeHourType", "OfficeHourType")
                        .WithMany("WorkHours")
                        .HasForeignKey("OfficeHourTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
