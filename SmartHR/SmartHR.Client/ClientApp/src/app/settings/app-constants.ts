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
              },
              {
                label: 'Job History',
                icon: 'history',
                link: '/employee-tracks'
              },
              {
                label: 'Employee Promotion',
                icon: 'layers',
                link: '/employee-promotions'

              }
            ]
          },
          {
            label: 'Leaves',
            icon: 'label_off',
            items: [
              {
                label: 'Leave type',
                icon: 'category',
                link: '/leave-types'
              },
              {
                label: 'Leave applications',
                icon: 'post_add',
                link: '/leave-applications'
              }
            ]
          }
        ]
      },
      {
        label: 'Payroll',
        icon: 'account_balance',
        items: [
          {
            label: 'Item 2.1',
            link: '/item-2-1',
            icon: 'favorite'
          },
          {
            label: 'Item 2.2',
            link: '/item-2-2',
            icon: 'favorite_border'
          }
        ]
      }
    ];
  }
}
