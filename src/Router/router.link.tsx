import { Route, Navigate } from 'react-router-dom';
import Dashboard from '../feature-module/dashboard/Dashboard';
import SalesDashbaord from '../feature-module/dashboard/salesdashbaord';
import BrandList from '../feature-module/inventory/brand-list';
import VariantAttributes from '../feature-module/inventory/variant-attributes';
import Warranty from '../feature-module/inventory/warranty';
import PrintBarcode from '../feature-module/inventory/print-bar-code';
import Grid from '../feature-module/uiinterface/grid';
import Images from '../feature-module/uiinterface/images';
import Lightboxes from '../feature-module/uiinterface/light-box';
import Media from '../feature-module/uiinterface/media';
import Modals from '../feature-module/uiinterface/modals';
import Offcanvas from '../feature-module/uiinterface/off-canvas';
import Pagination from '../feature-module/uiinterface/pagination';

import Alert from '../feature-module/uiinterface/alert';
import Accordion from '../feature-module/uiinterface/accordion';
import Avatar from '../feature-module/uiinterface/avatar';
import Badges from '../feature-module/uiinterface/badges';
import Borders from '../feature-module/uiinterface/borders';
import Buttons from '../feature-module/uiinterface/buttons';
import ButtonsGroup from '../feature-module/uiinterface/buttons-group';
import Popovers from '../feature-module/uiinterface/pop-over';

import Breadcrumb from '../feature-module/uiinterface/bread-crumb';
import Cards from '../feature-module/uiinterface/cards';
import Dropdowns from '../feature-module/uiinterface/drop-downs';
import Colors from '../feature-module/uiinterface/colors';
import Carousel from '../feature-module/uiinterface/carousel';
import Spinner from '../feature-module/uiinterface/spinner';
import NavTabs from '../feature-module/uiinterface/navtabs';
import Toasts from '../feature-module/uiinterface/toasts';
import Typography from '../feature-module/uiinterface/typography';
import Video from '../feature-module/uiinterface/video';
import Tooltips from '../feature-module/uiinterface/tool-tips';
import SweetAlert from '../feature-module/uiinterface/sweet-alert';
import Progress from '../feature-module/uiinterface/progress';
import Placeholder from '../feature-module/uiinterface/place-holder';
import RangeSlides from '../feature-module/uiinterface/range-slider';

import DepartmentGrid from '../feature-module/hrm/department-grid';
import DepartmentList from '../feature-module/hrm/department-list';
import Designation from '../feature-module/hrm/designation';
import Shift from '../feature-module/hrm/shift';
import AttendanceEmployee from '../feature-module/hrm/attendance-employee';
import Chats from '../feature-module/Application/chat';
import ExpensesList from '../feature-module/FinanceAccounts/expenses-list';
import ExpenseCategory from '../feature-module/FinanceAccounts/expense-category';
import Calendar from '../feature-module/Application/calendar';
import ExpiredProduct from '../feature-module/inventory/expired-product';
import LowStock from '../feature-module/inventory/low-stock';
import CategoryList from '../feature-module/inventory/category-list';
import SubCategories from '../feature-module/inventory/sub-categories';
import EditProduct from '../feature-module/inventory/edit-product';
import Videocall from '../feature-module/Application/video-call';
import Audiocall from '../feature-module/Application/audio-call';
import Email from '../feature-module/Application/email';
import Callhistory from '../feature-module/Application/call-history';
import ToDo from '../feature-module/Application/todo';
import QRcode from '../feature-module/inventory/qr-code';
import PurchasesList from '../feature-module/purchases/purchases-list';
import PurchaseOrderReport from '../feature-module/purchases/purchase-order-report';
import PurchaseReturns from '../feature-module/purchases/purchase-returns';
import Appearance from '../feature-module/settings/websitesettings/appearance';
import SocialAuthentication from '../feature-module/settings/websitesettings/social-authentication';
import LanguageSettings from '../feature-module/settings/websitesettings/language-settings';
import InvoiceSettings from '../feature-module/settings/appsetting/invoice-settings';
import PrinterSettings from '../feature-module/settings/appsetting/printer-settings';
import PosSettings from '../feature-module/settings/websitesettings/pos-settings';
import CustomFields from '../feature-module/settings/websitesettings/custom-fields';
import EmailSettings from '../feature-module/settings/systemsettings/email-settings';
import SmsGateway from '../feature-module/settings/systemsettings/sms-gateway';
import OtpSettings from '../feature-module/settings/systemsettings/otp-settings';
import GdprSettings from '../feature-module/settings/systemsettings/gdpr-settings';
import PaymentGateway from '../feature-module/settings/financialsettings/payment-gateway';
import BankSetting from '../feature-module/settings/financialsettings/bank-setting';
import Customers from '../feature-module/people/customers';
import Suppliers from '../feature-module/people/suppliers';
import StoreList from '../core/modals/peoples/store-list';
import Managestock from '../feature-module/stock/manage-stock';
import StockAdjustment from '../feature-module/stock/stock-Adjustment';
import StockTransfer from '../feature-module/stock/stock-Transfer';
import SalesReport from '../feature-module/Reports/sales-report';
import PurchaseReport from '../feature-module/Reports/purchase-report';
import InventoryReport from '../feature-module/Reports/inventory-report';
import Invoicereport from '../feature-module/Reports/invoice-report';
import SupplierReport from '../feature-module/Reports/supplier-report';
import CustomerReport from '../feature-module/Reports/customer-report';
import ExpenseReport from '../feature-module/Reports/expense-report';
import IncomeReport from '../feature-module/Reports/income-report';
import TaxReport from '../feature-module/Reports/tax-report';
import ProfitLoss from '../feature-module/Reports/profit-loss';
import GeneralSettings from '../feature-module/settings/generalsettings/general-settings';
import SecuritySettings from '../feature-module/settings/generalsettings/security-settings';
import Notification from '../feature-module/settings/generalsettings/notification';
import ConnectedApps from '../feature-module/settings/generalsettings/connected-apps';
import SystemSettings from '../feature-module/settings/websitesettings/system-settings';
import CompanySettings from '../feature-module/settings/websitesettings/company-settings';
import LocalizationSettings from '../feature-module/settings/websitesettings/localization-settings';
import Prefixes from '../feature-module/settings/websitesettings/prefixes';
import Preference from '../feature-module/settings/websitesettings/preference';
import BanIpaddress from '../feature-module/settings/othersettings/ban-ip-address';
import StorageSettings from '../feature-module/settings/othersettings/storage-settings';
import Pos from '../feature-module/sales/pos';
import AttendanceAdmin from '../feature-module/hrm/attendance-admin';
import Payslip from '../feature-module/hrm/pay-slip';
import Holidays from '../feature-module/hrm/holidays';
import SalesList from '../feature-module/sales/sales-list';
import InvoiceReport from '../feature-module/sales/invoice-report';
import SalesReturn from '../feature-module/sales/sales-return';
import QuotationList from '../feature-module/sales/quotation-list';
import Notes from '../feature-module/Application/notes';
import FileManager from '../feature-module/Application/file-manager';
import Profile from '../feature-module/pages/profile';
import Signin from '../feature-module/pages/login/signin';
import SigninTwo from '../feature-module/pages/login/signin-Two';
import SigninThree from '../feature-module/pages/login/signin-Three';
import RegisterTwo from '../feature-module/pages/register/register-Two';
import Register from '../feature-module/pages/register/register';
import RegisterThree from '../feature-module/pages/register/register-Three';
import Forgotpassword from '../feature-module/pages/forgotpassword/forgot-password';
import ForgotpasswordTwo from '../feature-module/pages/forgotpassword/forgot-password-Two';
import ForgotpasswordThree from '../feature-module/pages/forgotpassword/forgot-password-Three';
import Resetpassword from '../feature-module/pages/resetpassword/reset-password';
import ResetpasswordTwo from '../feature-module/pages/resetpassword/reset-password-Two';
import ResetpasswordThree from '../feature-module/pages/resetpassword/reset-password-Three';
import EmailVerification from '../feature-module/pages/emailverification/email-verification';
import EmailverificationTwo from '../feature-module/pages/emailverification/email-verification-Two';
import EmailverificationThree from '../feature-module/pages/emailverification/email-verification-Three';
import Twostepverification from '../feature-module/pages/twostepverification/two-step-verification';
import TwostepverificationTwo from '../feature-module/pages/twostepverification/two-step-verification-Two';
import TwostepverificationThree from '../feature-module/pages/twostepverification/two-step-verification-Three';
import Lockscreen from '../feature-module/pages/lock-screen';
import Error404 from '../feature-module/pages/errorpages/error-404';
import Error500 from '../feature-module/pages/errorpages/error-500';
import Blankpage from '../feature-module/pages/blank-page';
import Comingsoon from '../feature-module/pages/coming-soon';
import Undermaintainence from '../feature-module/pages/under-maintainence';
import Users from '../feature-module/usermanagement/users';
import RolesPermissions from '../feature-module/usermanagement/roles-permissions';
import Permissions from '../feature-module/usermanagement/permissions';
import DeleteAccount from '../feature-module/usermanagement/delete-account';
import EmployeesGrid from '../feature-module/hrm/employees-grid';
import EditEmployee from '../feature-module/hrm/edit-employee';
import AddEmployee from '../feature-module/hrm/add-employee';
import LeavesAdmin from '../feature-module/hrm/leaves-admin';
import LeavesEmployee from '../feature-module/hrm/leaves-employee';
import LeaveTypes from '../feature-module/hrm/leave-types';
import { Units } from '../feature-module/inventory/units';
import TaxRates from '../feature-module/settings/financialsettings/tax-rates';
import CurrencySettings from '../feature-module/settings/financialsettings/currency-settings';
import WareHouses from '../core/modals/peoples/warehouses';
import Coupons from '../feature-module/coupons/coupons';
import { all_routes } from './all_routes';
import BankSettingGrid from '../feature-module/settings/financialsettings/bank-setting-grid';
import PayrollList from '../feature-module/hrm/payroll-list';

// !Move every modified route you worked on under this
import ProductsList from '../feature-module/inventory/products/products-list';
import ProductDetail from '../feature-module/inventory/products/product-item';
import AddProducts from '../feature-module/inventory/add-products';
import AddStandardProduct from '../feature-module/inventory/add-products/standard-product';
import AddCompositeProduct from '../feature-module/inventory/add-products/composite-product';
import AddVariantProduct from '../feature-module/inventory/add-products/variant-product';
// import AddProduct from '../feature-module/inventory/add-product';

const routes = all_routes;

export const publicRoutes = [
  {
    id: 1,
    path: routes.dashboard,
    name: 'home',
    element: <Dashboard />,
    route: Route,
  },
  {
    id: 2,
    path: routes.productslist,
    name: 'products',
    element: <ProductsList />,
    route: Route,
  },
  {
    id: 3,
    path: routes.addproducts,
    name: 'addProductType',
    element: <AddProducts />,
    route: Route,
  },
  {
    id: 4,
    path: routes.salesdashboard,
    name: 'salesdashboard',
    element: <SalesDashbaord />,
    route: Route,
  },
  {
    id: 5,
    path: routes.brandlist,
    name: 'brant',
    element: <BrandList />,
    route: Route,
  },
  {
    id: 6,
    path: routes.units,
    name: 'unit',
    element: <Units />,
    route: Route,
  },
  {
    id: 7,
    path: routes.variantyattributes,
    name: 'variantyattributes',
    element: <VariantAttributes />,
    route: Route,
  },
  {
    id: 8,
    path: routes.warranty,
    name: 'warranty',
    element: <Warranty />,
    route: Route,
  },
  {
    id: 9,
    path: routes.barcode,
    name: 'barcode',
    element: <PrintBarcode />,
    route: Route,
  },
  {
    id: 10,
    path: routes.alerts,
    name: 'alert',
    element: <Alert />,
    route: Route,
  },
  {
    id: 11,
    path: routes.grid,
    name: 'grid',
    element: <Grid />,
    route: Route,
  },

  {
    id: 12,
    path: routes.accordion,
    name: 'accordion',
    element: <Accordion />,
    route: Route,
  },
  {
    id: 13,
    path: routes.avatar,
    name: 'avatar',
    element: <Avatar />,
    route: Route,
  },
  {
    id: 14,
    path: routes.images,
    name: 'images',
    element: <Images />,
    route: Route,
  },

  {
    id: 15,
    path: routes.badges,
    name: 'badges',
    element: <Badges />,
    route: Route,
  },
  {
    id: 16,
    path: routes.lightbox,
    name: 'lightbox',
    element: <Lightboxes />,
    route: Route,
  },

  {
    id: 17,
    path: routes.borders,
    name: 'borders',
    element: <Borders />,
    route: Route,
  },
  {
    id: 18,
    path: routes.media,
    name: 'lightbox',
    element: <Media />,
    route: Route,
  },
  {
    id: 19,
    path: routes.buttons,
    name: 'borders',
    element: <Buttons />,
    route: Route,
  },
  {
    id: 20,
    path: routes.modals,
    name: 'modals',
    element: <Modals />,
    route: Route,
  },
  {
    id: 21,
    path: routes.offcanvas,
    name: 'offcanvas',
    element: <Offcanvas />,
    route: Route,
  },
  {
    id: 22,
    path: routes.pagination,
    name: 'offcanvas',
    element: <Pagination />,
    route: Route,
  },
  {
    id: 23,
    path: routes.buttonsgroup,
    name: 'buttonsgroup',
    element: <ButtonsGroup />,
    route: Route,
  },
  {
    id: 24,
    path: routes.popover,
    name: 'buttonsgroup',
    element: <Popovers />,
    route: Route,
  },
  {
    id: 25,
    path: routes.breadcrumb,
    name: 'breadcrumb',
    element: <Breadcrumb />,
    route: Route,
  },
  {
    id: 26,
    path: routes.cards,
    name: 'cards',
    element: <Cards />,
    route: Route,
  },
  {
    id: 27,
    path: routes.dropdowns,
    name: 'dropdowns',
    element: <Dropdowns />,
    route: Route,
  },
  {
    id: 27,
    path: routes.colors,
    name: 'colors',
    element: <Colors />,
    route: Route,
  },
  {
    id: 28,
    path: routes.carousel,
    name: 'carousel',
    element: <Carousel />,
    route: Route,
  },
  {
    id: 29,
    path: routes.spinner,
    name: 'spinner',
    element: <Spinner />,
    route: Route,
  },
  {
    id: 30,
    path: routes.carousel,
    name: 'carousel',
    element: <Carousel />,
    route: Route,
  },
  {
    id: 31,
    path: routes.navtabs,
    name: 'navtabs',
    element: <NavTabs />,
    route: Route,
  },
  {
    id: 32,
    path: routes.toasts,
    name: 'toasts',
    element: <Toasts />,
    route: Route,
  },
  {
    id: 33,
    path: routes.typography,
    name: 'typography',
    element: <Typography />,
    route: Route,
  },
  {
    id: 34,
    path: routes.video,
    name: 'video',
    element: <Video />,
    route: Route,
  },
  {
    id: 35,
    path: routes.tooltip,
    name: 'tooltip',
    element: <Tooltips />,
    route: Route,
  },
  // {
  //   id: 36,
  //   path: routes.draganddrop,
  //   name: 'draganddrop',
  //   element: <DragDrop />,
  //   route: Route,
  // },
  {
    id: 37,
    path: routes.sweetalerts,
    name: 'sweetalerts',
    element: <SweetAlert />,
    route: Route,
  },
  {
    id: 38,
    path: routes.progress,
    name: 'progress',
    element: <Progress />,
    route: Route,
  },
  {
    id: 38,
    path: routes.departmentgrid,
    name: 'departmentgrid',
    element: <DepartmentGrid />,
    route: Route,
  },
  {
    id: 39,
    path: routes.placeholder,
    name: 'placeholder',
    element: <Placeholder />,
    route: Route,
  },

  {
    id: 39,
    path: routes.departmentlist,
    name: 'departmentlist',
    element: <DepartmentList />,
    route: Route,
  },
  // {
  //   id: 40,
  //   path: routes.rating,
  //   name: 'rating',
  //   element: <Rating />,
  // },

  {
    id: 40,
    path: routes.designation,
    name: 'designation',
    element: <Designation />,
    route: Route,
  },
  // {
  //   id: 41,
  //   path: routes.texteditor,
  //   name: 'text-editor',
  //   element: <TextEditor />,
  //   route: Route,
  // },

  {
    id: 41,

    path: routes.shift,
    name: 'shift',
    element: <Shift />,
    route: Route,
  },
  // {
  //   id: 42,
  //   path: routes.counter,
  //   name: 'counter',
  //   element: <Counter />,
  //   route: Route,
  // },
  {
    id: 42,
    path: routes.attendanceemployee,
    name: 'attendanceemployee',
    element: <AttendanceEmployee />,
    route: Route,
  },
  // {
  //   id: 43,
  //   path: routes.scrollbar,
  //   name: 'scrollbar',
  //   element: <Uiscrollbar />,
  //   route: Route,
  // },
  // {
  //   id: 43,
  //   path: routes.clipboard,
  //   name: 'clipboard',
  //   element: <ClipBoard />,
  //   route: Route,
  // },
  // {
  //   id: 44,
  //   path: routes.stickynote,
  //   name: 'stickynote',
  //   element: <Stickynote />,
  //   route: Route,
  // },
  // {
  //   id: 44,
  //   path: routes.tablebasic,
  //   name: 'tablebasic',
  //   element: <TablesBasic />,
  //   route: Route,
  // },
  // {
  //   id: 45,
  //   path: routes.timeline,
  //   name: 'timeline',
  //   element: <Timeline />,
  //   route: Route,
  // },
  // {
  //   id: 45,
  //   path: routes.datatable,
  //   name: 'datatable',
  //   element: <DataTables />,
  //   route: Route,
  // },
  // {
  //   id: 46,
  //   path: routes.apexchart,
  //   name: 'apex-chart',
  //   element: <Apexchart />,
  //   route: Route,
  // },

  // {
  //   id: 46,
  //   path: routes.basicinput,
  //   name: 'formbasicinput',
  //   element: <FormBasicInputs />,
  //   route: Route,
  // },
  // {
  //   id: 47,
  //   path: routes.chartjs,
  //   name: 'chart-js',
  //   element: <ChartJs />,
  //   route: Route,
  // },
  // {
  //   id: 47,
  //   path: routes.checkboxradio,
  //   name: 'checkboxradio',
  //   element: <CheckboxRadios />,
  //   route: Route,
  // },
  {
    id: 48,
    path: routes.rangeslider,
    name: 'range-slider',
    element: <RangeSlides />,
    route: Route,
  },
  // {
  //   id: 49,
  //   path: routes.fontawesome,
  //   name: 'fontawesome',
  //   element: <FontawesomeIcons />,
  //   route: Route,
  // },
  // {
  //   id: 50,
  //   path: routes.feathericon,
  //   name: 'feathericon',
  //   element: <FeatherIcons />,
  //   route: Route,
  // },
  // {
  //   id: 51,
  //   path: routes.ionicicons,
  //   name: 'ionicicons',
  //   element: <IonicIcons />,
  //   route: Route,
  // },
  // {
  //   id: 52,
  //   path: routes.materialicons,
  //   name: 'materialicons',
  //   element: <MaterialIcons />,
  //   route: Route,
  // },
  // {
  //   id: 53,
  //   path: routes.pe7icons,
  //   name: 'pe7icons',
  //   element: <PE7Icons />,
  //   route: Route,
  // },
  // {
  //   id: 54,
  //   path: routes.simpleline,
  //   name: 'simpleline',
  //   element: <SimplelineIcons />,
  //   route: Route,
  // },
  // {
  //   id: 55,
  //   path: routes.themifyicons,
  //   name: 'themifyicon',
  //   element: <ThemifyIcons />,
  //   route: Route,
  // },
  // {
  //   id: 56,
  //   path: routes.iconweather,
  //   name: 'iconweather',
  //   element: <WeatherIcons />,
  //   route: Route,
  // },
  // {
  //   id: 57,
  //   path: routes.typicons,
  //   name: 'typicons',
  //   element: <TypiconIcons />,
  //   route: Route,
  // },
  // {
  //   id: 58,
  //   path: routes.flagicons,
  //   name: 'flagicons',
  //   element: <FlagIcons />,
  //   route: Route,
  // },
  // {
  //   id: 58,
  //   path: routes.inputgroup,
  //   name: 'inputgroup',
  //   element: <InputGroup />,
  //   route: Route,
  // },
  // {
  //   id: 59,
  //   path: routes.ribbon,
  //   name: 'ribbon',
  //   element: <Ribbon />,
  //   route: Route,
  // },
  {
    id: 60,
    path: routes.chat,
    name: 'chat',
    element: <Chats />,
    route: Route,
  },
  // {
  //   id: 49,
  //   path: routes.gridgutters,
  //   name: 'gridgutters',
  //   element: <GridGutters />,
  //   route: Route,
  // },
  // {
  //   id: 50,
  //   path: routes.gridgutters,
  //   name: 'gridgutters',
  //   element: <GridGutters />,
  //   route: Route,
  // },
  // {
  //   id: 51,
  //   path: routes.formselect,
  //   name: 'formselect',
  //   element: <FormSelect />,
  //   route: Route,
  // },
  // {
  //   id: 52,
  //   path: routes.fileupload,
  //   name: 'fileupload',
  //   element: <FileUpload />,
  //   route: Route,
  // },
  // {
  //   id: 53,
  //   path: routes.formmask,
  //   name: 'formmask',
  //   element: <FormMask />,
  //   route: Route,
  // },
  // {
  //   id: 54,
  //   path: routes.formhorizontal,
  //   name: 'formhorizontal',
  //   element: <FormHorizontal />,
  //   route: Route,
  // },
  // {
  //   id: 54,
  //   path: routes.formvertical,
  //   name: 'formvertical',
  //   element: <FormVertical />,
  //   route: Route,
  // },
  // {
  //   id: 55,
  //   path: routes.floatinglabel,
  //   name: 'floatinglabel',
  //   element: <FloatingLabel />,
  //   route: Route,
  // },
  // {
  //   id: 56,
  //   path: routes.formvalidation,
  //   name: 'formvalidation',
  //   element: <FormValidation />,
  //   route: Route,
  // },
  // {
  //   id: 57,
  //   path: routes.select2,
  //   name: 'select2',
  //   element: <FormSelect2 />,
  //   route: Route,
  // },
  // {
  //   id: 58,
  //   path: routes.wizard,
  //   name: 'wizard',
  //   element: <FormWizard />,
  //   route: Route,
  // },
  {
    id: 58,
    path: routes.expiredproduct,
    name: 'expiredproduct',
    element: <ExpiredProduct />,
    route: Route,
  },
  {
    id: 59,
    path: routes.lowstock,
    name: 'lowstock',
    element: <LowStock />,
    route: Route,
  },
  {
    id: 60,
    path: routes.categorylist,
    name: 'categorylist',
    element: <CategoryList />,
    route: Route,
  },
  {
    id: 61,
    path: routes.expenselist,
    name: 'expenselist',
    element: <ExpensesList />,
    route: Route,
  },
  {
    id: 62,
    path: routes.expensecategory,
    name: 'expensecategory',
    element: <ExpenseCategory />,
    route: Route,
  },
  {
    id: 63,
    path: routes.calendar,
    name: 'calendar',
    element: <Calendar />,
    route: Route,
  },

  {
    id: 64,
    path: routes.subcategories,
    name: 'subcategories',
    element: <SubCategories />,
    route: Route,
  },
  {
    id: 65,
    path: routes.editproduct,
    name: 'editproduct',
    element: <EditProduct />,
    route: Route,
  },
  {
    id: 63,
    path: routes.videocall,
    name: 'videocall',
    element: <Videocall />,
    route: Route,
  },
  {
    id: 64,
    path: routes.audiocall,
    name: 'audiocall',
    element: <Audiocall />,
    route: Route,
  },
  {
    id: 65,
    path: routes.email,
    name: 'email',
    element: <Email />,
    route: Route,
  },
  {
    id: 66,
    path: routes.callhistory,
    name: 'callhistory',
    element: <Callhistory />,
    route: Route,
  },
  {
    id: 67,
    path: routes.todo,
    name: 'todo',
    element: <ToDo />,
    route: Route,
  },
  {
    id: 66,
    path: routes.variantattributes,
    name: 'variantattributes',
    element: <VariantAttributes />,
    route: Route,
  },
  {
    id: 67,
    path: routes.qrcode,
    name: 'qrcode',
    element: <QRcode />,
    route: Route,
  },
  {
    id: 68,
    path: routes.purchaselist,
    name: 'purchaselist',
    element: <PurchasesList />,
    route: Route,
  },
  {
    id: 69,
    path: routes.purchaseorderreport,
    name: 'purchaseorderreport',
    element: <PurchaseOrderReport />,
    route: Route,
  },
  {
    id: 70,
    path: routes.purchasereturn,
    name: 'purchasereturn',
    element: <PurchaseReturns />,
    route: Route,
  },
  {
    id: 71,
    path: routes.appearance,
    name: 'appearance',
    element: <Appearance />,
    route: Route,
  },
  {
    id: 72,
    path: routes.socialauthendication,
    name: 'socialauthendication',
    element: <SocialAuthentication />,
    route: Route,
  },
  {
    id: 73,
    path: routes.languagesettings,
    name: 'languagesettings',
    element: <LanguageSettings />,
    route: Route,
  },
  {
    id: 74,
    path: routes.invoicesettings,
    name: 'invoicesettings',
    element: <InvoiceSettings />,
    route: Route,
  },
  {
    id: 75,
    path: routes.printersettings,
    name: 'printersettings',
    element: <PrinterSettings />,
    route: Route,
  },
  {
    id: 76,
    path: routes.possettings,
    name: 'possettings',
    element: <PosSettings />,
    route: Route,
  },
  {
    id: 77,
    path: routes.customfields,
    name: 'customfields',
    element: <CustomFields />,
    route: Route,
  },
  {
    id: 78,
    path: routes.emailsettings,
    name: 'emailsettings',
    element: <EmailSettings />,
    route: Route,
  },
  {
    id: 79,
    path: routes.smssettings,
    name: 'smssettings',
    element: <SmsGateway />,
    route: Route,
  },
  {
    id: 80,
    path: routes.otpsettings,
    name: 'otpsettings',
    element: <OtpSettings />,
    route: Route,
  },
  {
    id: 81,
    path: routes.gdbrsettings,
    name: 'gdbrsettings',
    element: <GdprSettings />,
    route: Route,
  },
  {
    id: 82,
    path: routes.paymentgateway,
    name: 'paymentgateway',
    element: <PaymentGateway />,
    route: Route,
  },
  {
    id: 83,
    path: routes.banksettingslist,
    name: 'banksettingslist',
    element: <BankSetting />,
    route: Route,
  },
  {
    id: 84,
    path: routes.customers,
    name: 'customers',
    element: <Customers />,
    route: Route,
  },
  {
    id: 85,
    path: routes.suppliers,
    name: 'suppliers',
    element: <Suppliers />,
    route: Route,
  },
  {
    id: 86,
    path: routes.storelist,
    name: 'storelist',
    element: <StoreList />,
    route: Route,
  },
  {
    id: 87,
    path: routes.managestock,
    name: 'managestock',
    element: <Managestock />,
    route: Route,
  },
  {
    id: 88,
    path: routes.stockadjustment,
    name: 'stockadjustment',
    element: <StockAdjustment />,
    route: Route,
  },
  {
    id: 89,
    path: routes.stocktransfer,
    name: 'stocktransfer',
    element: <StockTransfer />,
    route: Route,
  },
  {
    id: 90,
    path: routes.salesreport,
    name: 'salesreport',
    element: <SalesReport />,
    route: Route,
  },
  {
    id: 91,
    path: routes.purchasereport,
    name: 'purchasereport',
    element: <PurchaseReport />,
    route: Route,
  },
  {
    id: 92,
    path: routes.inventoryreport,
    name: 'inventoryreport',
    element: <InventoryReport />,
    route: Route,
  },
  {
    id: 93,
    path: routes.invoicereport,
    name: 'invoicereport',
    element: <Invoicereport />,
    route: Route,
  },
  {
    id: 94,
    path: routes.supplierreport,
    name: 'supplierreport',
    element: <SupplierReport />,
    route: Route,
  },
  {
    id: 95,
    path: routes.customerreport,
    name: 'customerreport',
    element: <CustomerReport />,
    route: Route,
  },
  {
    id: 96,
    path: routes.expensereport,
    name: 'expensereport',
    element: <ExpenseReport />,
    route: Route,
  },
  {
    id: 97,
    path: routes.incomereport,
    name: 'incomereport',
    element: <IncomeReport />,
    route: Route,
  },
  {
    id: 98,
    path: routes.taxreport,
    name: 'taxreport',
    element: <TaxReport />,
    route: Route,
  },
  {
    id: 99,
    path: routes.profitloss,
    name: 'profitloss',
    element: <ProfitLoss />,
    route: Route,
  },
  {
    id: 89,
    path: routes.generalsettings,
    name: 'generalsettings',
    element: <GeneralSettings />,
    route: Route,
  },
  {
    id: 90,
    path: routes.securitysettings,
    name: 'securitysettings',
    element: <SecuritySettings />,
    route: Route,
  },
  {
    id: 91,
    path: routes.notification,
    name: 'notification',
    element: <Notification />,
    route: Route,
  },
  {
    id: 92,
    path: routes.connectedapps,
    name: 'connectedapps',
    element: <ConnectedApps />,
    route: Route,
  },
  {
    id: 93,
    path: routes.systemsettings,
    name: 'systemsettings',
    element: <SystemSettings />,
    route: Route,
  },
  {
    id: 94,
    path: routes.companysettings,
    name: 'companysettings',
    element: <CompanySettings />,
    route: Route,
  },
  {
    id: 94,
    path: routes.localizationsettings,
    name: 'localizationsettings',
    element: <LocalizationSettings />,
    route: Route,
  },
  {
    id: 95,
    path: routes.prefixes,
    name: 'prefixes',
    element: <Prefixes />,
    route: Route,
  },
  {
    id: 99,
    path: routes.preference,
    name: 'preference',
    element: <Preference />,
    route: Route,
  },
  {
    id: 99,
    path: routes.banipaddress,
    name: 'banipaddress',
    element: <BanIpaddress />,
    route: Route,
  },
  {
    id: 99,
    path: routes.storagesettings,
    name: 'storagesettings',
    element: <StorageSettings />,
    route: Route,
  },
  {
    id: 99,
    path: routes.taxrates,
    name: 'taxrates',
    element: <TaxRates />,
    route: Route,
  },
  {
    id: 99,
    path: routes.currencysettings,
    name: 'currencysettings',
    element: <CurrencySettings />,
    route: Route,
  },
  {
    id: 99,
    path: routes.pos,
    name: 'pos',
    element: <Pos />,
    route: Route,
  },
  {
    id: 100,
    path: routes.attendanceadmin,
    name: 'attendanceadmin',
    element: <AttendanceAdmin />,
    route: Route,
  },
  {
    id: 101,
    path: routes.payslip,
    name: 'payslip',
    element: <Payslip />,
    route: Route,
  },
  {
    id: 102,
    path: routes.saleslist,
    name: 'saleslist',
    element: <SalesList />,
    route: Route,
  },
  {
    id: 102,
    path: routes.invoicereport,
    name: 'invoicereport',
    element: <InvoiceReport />,
    route: Route,
  },
  {
    id: 102,
    path: routes.holidays,
    name: 'holidays',
    element: <Holidays />,
    route: Route,
  },
  {
    id: 102,
    path: routes.salesreturn,
    name: 'salesreturn',
    element: <SalesReturn />,
    route: Route,
  },
  {
    id: 103,
    path: routes.quotationlist,
    name: 'quotationlist',
    element: <QuotationList />,
    route: Route,
  },
  {
    id: 104,
    path: routes.notes,
    name: 'notes',
    element: <Notes />,
    route: Route,
  },
  {
    id: 105,
    path: routes.filemanager,
    name: 'filemanager',
    element: <FileManager />,
    route: Route,
  },
  {
    id: 106,
    path: routes.profile,
    name: 'profile',
    element: <Profile />,
    route: Route,
  },
  {
    id: 20,
    path: routes.blankpage,
    name: 'blankpage',
    element: <Blankpage />,
    route: Route,
  },
  {
    id: 104,
    path: routes.users,
    name: 'users',
    element: <Users />,
    route: Route,
  },
  {
    id: 105,
    path: routes.rolespermission,
    name: 'rolespermission',
    element: <RolesPermissions />,
    route: Route,
  },
  {
    id: 106,
    path: routes.permissions,
    name: 'permissions',
    element: <Permissions />,
    route: Route,
  },
  {
    id: 107,
    path: routes.deleteaccount,
    name: 'deleteaccount',
    element: <DeleteAccount />,
    route: Route,
  },
  {
    id: 108,
    path: routes.employeegrid,
    name: 'employeegrid',
    element: <EmployeesGrid />,
    route: Route,
  },
  {
    id: 109,
    path: routes.addemployee,
    name: 'addemployee',
    element: <AddEmployee />,
    route: Route,
  },
  {
    id: 110,
    path: routes.editemployee,
    name: 'editemployee',
    element: <EditEmployee />,
    route: Route,
  },
  {
    id: 111,
    path: routes.leavesadmin,
    name: 'leavesadmin',
    element: <LeavesAdmin />,
    route: Route,
  },
  {
    id: 112,
    path: routes.leavesemployee,
    name: 'leavesemployee',
    element: <LeavesEmployee />,
    route: Route,
  },
  {
    id: 113,
    path: routes.leavestype,
    name: 'leavestype',
    element: <LeaveTypes />,
    route: Route,
  },
  {
    id: 113,
    path: `product/:id`,
    name: 'productdetails',
    element: <ProductDetail />,
    route: Route,
  },
  {
    id: 114,
    path: routes.warehouses,
    name: 'warehouses',
    element: <WareHouses />,
    route: Route,
  },
  {
    id: 115,
    path: routes.coupons,
    name: 'coupons',
    element: <Coupons />,
    route: Route,
  },
  {
    id: 116,
    path: '*',
    name: 'NotFound',
    element: <Navigate to="/" />,
    route: Route,
  },
  {
    id: 117,
    path: '/',
    name: 'Root',
    element: <Navigate to="/signin" />,
    route: Route,
  },
  {
    id: 118,
    path: routes.banksettingsgrid,
    name: 'banksettingsgrid',
    element: <BankSettingGrid />,
    route: Route,
  },
  {
    id: 119,
    path: routes.payrollList,
    name: 'payroll-list',
    element: <PayrollList />,
    route: Route,
  },
  {
    id: 100,
    path: routes.addStandardProduct,
    name: 'standard-products',
    element: <AddStandardProduct />,
    route: Route,
  },
  {
    id: 101,
    path: routes.addCompositeProduct,
    name: 'composite-products',
    element: <AddCompositeProduct />,
    route: Route,
  },
  {
    id: 102,
    path: routes.addVariantProduct,
    name: 'variant-products',
    element: <AddVariantProduct />,
    route: Route,
  },
];
export const posRoutes = [
  {
    id: 1,
    path: routes.pos,
    name: 'pos',
    element: <Pos />,
    route: Route,
  },
];

export const pagesRoute = [
  {
    id: 1,
    path: routes.signin,
    name: 'signin',
    element: <Signin />,
    route: Route,
  },
  {
    id: 2,
    path: routes.signintwo,
    name: 'signintwo',
    element: <SigninTwo />,
    route: Route,
  },
  {
    id: 3,
    path: routes.signinthree,
    name: 'signinthree',
    element: <SigninThree />,
    route: Route,
  },
  {
    id: 4,
    path: routes.register,
    name: 'register',
    element: <Register />,
    route: Route,
  },
  {
    id: 5,
    path: routes.registerTwo,
    name: 'registerTwo',
    element: <RegisterTwo />,
    route: Route,
  },
  {
    id: 6,
    path: routes.registerThree,
    name: 'registerThree',
    element: <RegisterThree />,
    route: Route,
  },
  {
    id: 7,
    path: routes.forgotPassword,
    name: 'forgotPassword',
    element: <Forgotpassword />,
    route: Route,
  },
  {
    id: 7,
    path: routes.forgotPasswordTwo,
    name: 'forgotPasswordTwo',
    element: <ForgotpasswordTwo />,
    route: Route,
  },
  {
    id: 8,
    path: routes.forgotPasswordThree,
    name: 'forgotPasswordThree',
    element: <ForgotpasswordThree />,
    route: Route,
  },
  {
    id: 9,
    path: routes.resetpassword,
    name: 'resetpassword',
    element: <Resetpassword />,
    route: Route,
  },
  {
    id: 10,
    path: routes.resetpasswordTwo,
    name: 'resetpasswordTwo',
    element: <ResetpasswordTwo />,
    route: Route,
  },
  {
    id: 11,
    path: routes.resetpasswordThree,
    name: 'resetpasswordThree',
    element: <ResetpasswordThree />,
    route: Route,
  },
  {
    id: 12,
    path: routes.emailverification,
    name: 'emailverification',
    element: <EmailVerification />,
    route: Route,
  },
  {
    id: 12,
    path: routes.emailverificationTwo,
    name: 'emailverificationTwo',
    element: <EmailverificationTwo />,
    route: Route,
  },
  {
    id: 13,
    path: routes.emailverificationThree,
    name: 'emailverificationThree',
    element: <EmailverificationThree />,
    route: Route,
  },
  {
    id: 14,
    path: routes.twostepverification,
    name: 'twostepverification',
    element: <Twostepverification />,
    route: Route,
  },
  {
    id: 15,
    path: routes.twostepverificationTwo,
    name: 'twostepverificationTwo',
    element: <TwostepverificationTwo />,
    route: Route,
  },
  {
    id: 16,
    path: routes.twostepverificationThree,
    name: 'twostepverificationThree',
    element: <TwostepverificationThree />,
    route: Route,
  },
  {
    id: 17,
    path: routes.lockscreen,
    name: 'lockscreen',
    element: <Lockscreen />,
    route: Route,
  },
  {
    id: 18,
    path: routes.error404,
    name: 'error404',
    element: <Error404 />,
    route: Route,
  },
  {
    id: 19,
    path: routes.error500,
    name: 'error500',
    element: <Error500 />,
    route: Route,
  },
  {
    id: 20,
    path: routes.comingsoon,
    name: 'comingsoon',
    element: <Comingsoon />,
    route: Route,
  },
  {
    id: 21,
    path: routes.undermaintenance,
    name: 'undermaintenance',
    element: <Undermaintainence />,
    route: Route,
  },
];
