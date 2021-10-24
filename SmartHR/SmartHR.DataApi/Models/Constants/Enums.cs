using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Models.Constants
{
    public enum OfficeHourType
    {
        Regular = 1, Ramadan
    }
    public enum EmployeeTypeName { Permanent=1, Casual, Contractual, Hourly_Basis }
    public enum CalculationType { FLAT=1, PARCENTAGE }
    [JsonConverter(typeof(Gender))]
    public enum Gender { Male=1, Female }
    [JsonConverter(typeof(MaritalStatus))]
    public enum MaritalStatus { Married=1, Unmarried }

    [JsonConverter(typeof(EmployeeStatus))]
    public enum EmployeeStatus { Active=1, OnLeave, Suspended, Inactive }
    public enum LeaveStatus
    {
        Pending = 1, Approved, Denied
    }
}
