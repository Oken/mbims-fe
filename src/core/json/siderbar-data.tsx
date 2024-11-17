import React from 'react';
import * as Icon from 'react-feather';

export interface SublistMenuItemsChildT {
  label: string;
  link?: string;
  showSubRoute?: boolean;
}

export interface SublistMenuItemsListT {
  label: string;
  link?: string;
  showSubRoute?: boolean;
  subMenu?: boolean;
  sublistMenuItemChild?: SublistMenuItemsChildT[];
}

export interface SublistMenuItemsT {
  label: string;
  link?: string;
  subMenu?: boolean;
  sublistMenuItemsList?: SublistMenuItemsListT[];
  showSubRoute?: boolean;
  icon?: React.ReactElement;
}

export interface SubMenuItemsT {
  label: string;
  icon?: React.ReactElement;
  link?: string;
  showSubRoute?: boolean;
  subMenu?: boolean;
  sublistMenuItems?: SublistMenuItemsT[];
}

export interface SidebarDataT {
  label: string;
  subMenuOpen?: boolean;
  showSubRoute?: boolean;
  subMenuHeader?: string;
  subMenu?: boolean;
  subMenuItems?: SubMenuItemsT[];
}

export const SidebarData: SidebarDataT[] = [
  {
    label: '',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: '',
    subMenuItems: [
      {
        label: 'Dashboard',
        icon: <Icon.Grid />,
        subMenu: false,
        showSubRoute: false,
        link: '/admin-dashboard',
      },
    ],
  },
  {
    label: 'Inventory',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: 'Inventory',
    subMenuItems: [
      {
        label: 'Products',
        link: '/product-list',
        icon: <Icon.Box />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Create Product',
        link: '/add-products',
        icon: <Icon.PlusSquare />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Expired Products',
        link: '/expired-products',
        icon: <Icon.Codesandbox />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Low Stocks',
        link: '/low-stocks',
        icon: <Icon.TrendingDown />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Category',
        link: '/category-list',
        icon: <Icon.Codepen />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Sub Category',
        link: '/sub-categories',
        icon: <Icon.Speaker />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Brands',
        link: '/brand-list',
        icon: <Icon.Tag />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Units',
        link: '/units',
        icon: <Icon.Speaker />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Variant Attributes',
        link: '/variant-attributes',
        icon: <Icon.Layers />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Warranties',
        link: '/warranty',
        icon: <Icon.Bookmark />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Print Barcode',
        link: '/barcode',
        icon: <Icon.AlignJustify />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Print QR Code',
        link: '/qrcode',
        icon: <Icon.Maximize />,
        showSubRoute: false,
        subMenu: false,
      },
    ],
  },
  {
    label: 'Stock',
    subMenuOpen: true,
    subMenuHeader: 'Stock',
    subMenu: true,
    showSubRoute: false,
    subMenuItems: [
      {
        label: 'Manage Stock',
        link: '/manage-stocks',
        icon: <Icon.Package />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Stock Adjustment',
        link: '/stock-adjustment',
        icon: <Icon.Clipboard />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Stock Transfer',
        link: '/stock-transfer',
        icon: <Icon.Truck />,
        showSubRoute: false,
        subMenu: false,
      },
    ],
  },
  {
    label: 'Sales',
    subMenuOpen: true,
    subMenuHeader: 'Sales',
    subMenu: false,
    showSubRoute: false,
    subMenuItems: [
      {
        label: 'Sales',
        link: '/sales-list',
        icon: <Icon.ShoppingCart />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Invoices',
        link: '/invoice-report',
        icon: <Icon.FileText />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Sales Return',
        link: '/sales-returns',
        icon: <Icon.Copy />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Quotation',
        link: '/quotation-list',
        icon: <Icon.Save />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'POS',
        link: '/pos',
        icon: <Icon.HardDrive />,
        showSubRoute: false,
        subMenu: false,
      },
    ],
  },
  {
    label: 'Purchases',
    subMenuOpen: true,
    subMenuHeader: 'Purchases',
    showSubRoute: false,
    subMenuItems: [
      {
        label: 'Purchases',
        link: '/purchase-list',
        icon: <Icon.ShoppingBag />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Purchase Order',
        link: '/purchase-order-report',
        icon: <Icon.FileMinus />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Purchase Return',
        link: '/purchase-returns',
        icon: <Icon.RefreshCw />,
        showSubRoute: false,
        subMenu: false,
      },
    ],
  },

  {
    label: 'Finance & Accounts',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: 'Finance & Accounts',
    subMenuItems: [
      {
        label: 'Expenses',
        subMenu: true,
        showSubRoute: false,
        icon: <Icon.FileText />,
        sublistMenuItems: [
          { label: 'Expenses', link: '/expense-list', showSubRoute: false },
          {
            label: 'Expense Category',
            link: '/expense-category',
            showSubRoute: false,
          },
        ],
      },
    ],
  },

  {
    label: 'People',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: 'People',

    subMenuItems: [
      {
        label: 'Customers',
        link: '/customers',
        icon: <Icon.User />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Suppliers',
        link: '/suppliers',
        icon: <Icon.Users />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Stores',
        link: '/store-list',
        icon: <Icon.Home />,
        showSubRoute: false,
        subMenu: false,
      },
      {
        label: 'Warehouses',
        link: '/warehouse',
        icon: <Icon.Archive />,
        showSubRoute: false,
        subMenu: false,
      },
    ],
  },

  {
    label: 'HRM',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: 'HRM',
    subMenuItems: [
      {
        label: 'Employees',
        link: '/employees-grid',
        icon: <Icon.Users />,
        showSubRoute: false,
      },
      {
        label: 'Departments',
        link: '/department-grid',
        icon: <Icon.User />,
        showSubRoute: false,
      },
      {
        label: 'Designations',
        link: '/designation',
        icon: <Icon.UserCheck />,
        showSubRoute: false,
      },
      {
        label: 'Shifts',
        link: '/shift',
        icon: <Icon.Shuffle />,
        showSubRoute: false,
      },

      {
        label: 'Attendance',
        link: '#',
        icon: <Icon.Clock />,
        showSubRoute: false,
        subMenu: true,

        sublistMenuItems: [
          { label: 'Employee', link: '/attendance-employee' },
          { label: 'Admin', link: '/attendance-admin' },
        ],
      },
      {
        label: 'Leaves',
        link: '#',
        icon: <Icon.Calendar />,
        showSubRoute: false,
        subMenu: true,
        sublistMenuItems: [
          { label: 'Employee Leaves', link: '/leaves-employee' },
          { label: 'Admin Leaves', link: '/leaves-admin' },
          { label: 'Leave Types', link: '/leave-types' },
        ],
      },
    ],
  },
  {
    label: 'Reports',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: 'Reports',
    subMenuItems: [
      {
        label: 'Sales Report',
        link: '/sales-report',
        icon: <Icon.BarChart2 />,
        showSubRoute: false,
      },
      {
        label: 'Purchase Report',
        link: '/purchase-report',
        icon: <Icon.PieChart />,
        showSubRoute: false,
      },
      {
        label: 'Inventory Report',
        link: '/inventory-report',
        icon: <Icon.Inbox />,
        showSubRoute: false,
      },
      {
        label: 'Invoice Report',
        link: '/invoice-report',
        icon: <Icon.File />,
        showSubRoute: false,
      },
      {
        label: 'Supplier Report',
        link: '/supplier-report',
        icon: <Icon.UserCheck />,
        showSubRoute: false,
      },
      {
        label: 'Customer Report',
        link: '/customer-report',
        icon: <Icon.User />,
        showSubRoute: false,
      },
      {
        label: 'Expense Report',
        link: '/expense-report',
        icon: <Icon.FileText />,
        showSubRoute: false,
      },
      {
        label: 'Income Report',
        link: '/income-report',
        icon: <Icon.BarChart />,
        showSubRoute: false,
      },
      {
        label: 'Tax Report',
        link: '/tax-report',
        icon: <Icon.Database />,
        showSubRoute: false,
      },
      {
        label: 'Profit & Loss',
        link: '/profit-loss-report',
        icon: <Icon.TrendingDown />,
        showSubRoute: false,
      },
    ],
  },

  {
    label: 'User Management',
    subMenuOpen: true,
    showSubRoute: false,
    subMenuHeader: 'User Management',
    subMenuItems: [
      {
        label: 'Users',
        link: '/users',
        icon: <Icon.UserCheck />,
        showSubRoute: false,
      },
      {
        label: 'Roles & Permissions',
        link: '/roles-permissions',
        icon: <Icon.UserCheck />,
        showSubRoute: false,
      },
      {
        label: 'Delete Account Request',
        link: '/delete-account',
        icon: <Icon.Lock />,
        showSubRoute: false,
      },
    ],
  },
  {
    label: 'Settings',
    subMenu: true,
    showSubRoute: false,
    subMenuHeader: 'Settings',
    subMenuItems: [
      {
        label: 'General Settings',
        subMenu: true,
        showSubRoute: false,
        icon: <Icon.Settings />,
        sublistMenuItems: [
          { label: 'Profile', link: '/general-settings' },
          { label: 'Security', link: '/security-settings' },
          { label: 'Notifications', link: '/notification' },
          { label: 'Connected Apps', link: '/connected-apps' },
        ],
      },
      {
        label: 'Website Settings',
        subMenu: true,
        showSubRoute: false,
        icon: <Icon.Globe />,
        sublistMenuItems: [
          {
            label: 'System Settings',
            link: '/system-settings',
            showSubRoute: false,
          },
          {
            label: 'Company Settings',
            link: '/company-settings',
            showSubRoute: false,
          },
          {
            label: 'Localization',
            link: '/localization-settings',
            showSubRoute: false,
          },
          { label: 'Prefixes', link: '/prefixes', showSubRoute: false },
          { label: 'Preference', link: '/preference', showSubRoute: false },
          { label: 'Appearance', link: '/appearance', showSubRoute: false },
          {
            label: 'Language',
            link: '/language-settings',
            showSubRoute: false,
          },
        ],
      },
      {
        label: 'App Settings',
        subMenu: true,

        showSubRoute: false,
        icon: <Icon.Smartphone />,
        sublistMenuItems: [
          { label: 'Invoice', link: '/invoice-settings', showSubRoute: false },
          { label: 'Printer', link: '/printer-settings', showSubRoute: false },
          { label: 'POS', link: '/pos-settings', showSubRoute: false },
          {
            label: 'Custom Fields',
            link: '/custom-fields',
            showSubRoute: false,
          },
        ],
      },
      {
        label: 'System Settings',
        subMenu: true,
        showSubRoute: false,
        icon: <Icon.Monitor />,
        sublistMenuItems: [
          { label: 'Email', link: '/email-settings', showSubRoute: false },
          { label: 'SMS Gateways', link: '/sms-gateway', showSubRoute: false },
          { label: 'OTP', link: '/otp-settings', showSubRoute: false },
          {
            label: 'GDPR Cookies',
            link: '/gdpr-settings',
            showSubRoute: false,
          },
        ],
      },
      {
        label: 'Financial Settings',
        subMenu: true,
        showSubRoute: false,
        icon: <Icon.DollarSign />,
        sublistMenuItems: [
          {
            label: 'Payment Gateway',
            link: '/payment-gateway-settings',
            showSubRoute: false,
          },
          {
            label: 'Bank Accounts',
            link: '/bank-settings-grid',
            showSubRoute: false,
          },
          { label: 'Tax Rates', link: '/tax-rates', showSubRoute: false },
          {
            label: 'Currencies',
            link: '/currency-settings',
            showSubRoute: false,
          },
        ],
      },
      {
        label: 'Other Settings',
        subMenu: true,
        showSubRoute: false,
        icon: <Icon.Hexagon />,
        sublistMenuItems: [{ label: 'Storage', link: '/storage-settings', showSubRoute: false }],
      },
      {
        label: 'Logout',
        link: '/signin',
        icon: <Icon.LogOut />,
        showSubRoute: false,
      },
    ],
  },
];

// export const _sidebarData: SidebarDataT = [
//   {
//     label: 'Main',
//     subMenuOpen: true,
//     showSubRoute: false,
//     subMenuHeader: 'Main',
//     subMenuItems: [
//       {
//         label: 'Dashboard',
//         icon: <Icon.Grid />,
//         subMenu: true,
//         showSubRoute: false,

//         sublistMenuItems: [
//           { label: 'Admin Dashboard', link: '/admin-dashboard' },
//           { label: 'Sales Dashboard', link: '/sales-dashboard' },
//         ],
//       },
//     ],
//   },
// ];
