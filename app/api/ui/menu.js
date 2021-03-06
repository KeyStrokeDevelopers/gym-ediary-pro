module.exports = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    link: '/app',
    icon: 'ios-menu-outline',
  }, {
    key: 'master',
    name: 'Master',
    link: '/app/pages/master',
    icon: 'ios-menu-outline',
  }, {
    key: 'enquiry',
    name: 'Enquiry',
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'addEnquiry',
        name: 'Add Enquiry',
        link: '/app/enquiry',
        icon: 'ios-menu-outline',
      }, {
        key: 'addMember',
        name: 'Add Member',
        link: '/app/addMember',
        icon: 'ios-menu-outline',
      },
    ]
  },
  {
    key: 'expenseIncome',
    name: 'Expense/Income',
    link: '/app/expenseIncome',
    icon: 'ios-menu-outline',
  }, {
    key: 'taskBoard',
    name: 'TaskBoard',
    link: '/app/taskboard',
    icon: 'ios-menu-outline',
  }, {
    key: 'shoping',
    name: 'Shoping',
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'productType',
        name: 'Product Type',
        link: '/app/shoping/productType',
        icon: 'ios-menu-outline',
      }, {
        key: 'brandUnit',
        name: 'BrandUnit',
        link: '/app/shoping/brandUnit',
        icon: 'ios-menu-outline',
      }, {
        key: 'product',
        name: 'Product',
        link: '/app/shoping/product',
        icon: 'ios-menu-outline',
      }, {
        key: 'purchase',
        name: 'Purchase',
        link: '/app/shoping/purchase/Purchase',
        icon: 'ios-menu-outline',
      }, {
        key: 'sale',
        name: 'Sale',
        link: '/app/shoping/sale/Sale',
        icon: 'ios-menu-outline',
      },
    ]
  },
  {
    key: 'reports',
    name: 'Reports',
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'pendingPayments',
        name: 'Pending Payments',
        link: '/app/reports/pendingPayments',
        icon: 'ios-menu-outline',
      }, {
        key: 'purchase',
        name: 'Purchase',
        link: '/app/reports/purchase',
        icon: 'ios-menu-outline',
      }, {
        key: 'sale',
        name: 'Sale',
        link: '/app/reports/sale',
        icon: 'ios-menu-outline',
      }, {
        key: 'attendance',
        name: 'Attendance',
        link: '/app/reports/attendance',
        icon: 'ios-menu-outline',
      }, {
        key: 'staffAttendance',
        name: 'Staff Attendance',
        link: '/app/reports/staffAttendance',
        icon: 'ios-menu-outline',
      }, {
        key: 'membershipReport',
        name: 'Membership Report',
        link: '/app/reports/membershipReport',
        icon: 'ios-menu-outline',
      }, {
        key: 'birthdayAnniversaryWishes',
        name: 'Wishes',
        link: '/app/reports/birthdayAnniversaryWishes',
        icon: 'ios-menu-outline',
      },
      // {
      //   key: 'classes',
      //   name: 'Classes',
      //   link: '/app/reports/classes',
      //   icon: 'ios-menu-outline',
      // },
      {
        key: 'registrationReport',
        name: 'Registration Report',
        link: '/app/reports/registrationReport',
        icon: 'ios-menu-outline',
      }, {
        key: 'renewalReport',
        name: 'Renewal Report',
        link: '/app/reports/renewalReport',
        icon: 'ios-menu-outline',
      }, {
        key: 'currentStock',
        name: 'Current Stock',
        link: '/app/reports/currentStock',
        icon: 'ios-menu-outline',
      },
    ]
  },

];
