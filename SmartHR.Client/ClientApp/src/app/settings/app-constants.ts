export class AppConstants {
  static apiUrl = "http://localhost:5000";

  static companyKey = "4B16ED20-0FE1-4C05-A4B5-57DCE557C90D";

  static get appName() {
    return "Smart HR";
  }
  static get navItems() {
    return [
      {
        label: 'Home',
        icon: 'home',
        link: '/home'
      },
      {
        label: 'HR',
        icon: 'group',
        items: [
          {
            label: 'Manage',
            icon: 'tune',
            items: [
              {
                label: 'Departments',
                icon: 'work_outline',
                link: '/departments'
              },
              {
                label: 'Salary heads',
                icon: 'title',
                link: '/salary-heads'
              },
              {
                label: 'Grades',
                icon: 'grade',
                link: '/grades'
              },
              {
                label: 'Deginations',
                icon: 'swap_vert',
                link: '/designations'
              }
            ]
          },
          {
            label: 'Employee',
            icon: 'people_outline',
            items: [
              {
                label: 'Employee List',
                icon: 'list',
                link: '/employees'
              }
            ]
          },
          {
            label: "Attendance",
            icon: 'punch_clock',
            items: [
              {
                label: 'Attendance List',
                icon: 'punch_clock',
                link: '/attendance'
              },
              {
                label: 'Attendance import',
                icon: 'import_contacts',
                link: 'attendance-import'
              }
            ]
          }
        ]
      },
      {
        label: 'Salary',
        icon: 'account_balance',
        link:'/salary'
      }
    ];
  }
}
