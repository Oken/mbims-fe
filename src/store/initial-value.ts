import { brandlistdata } from '../core/json/brandlistdata';
import { dashboarrecentproductddata } from '../core/json/dashboarddata';
import { expiredproductdata } from '../core/json/dashboardexpiredproduct';
import { salestransaction } from '../core/json/salesdashboardrecenttranscation';
import { unitsdata } from '../core/json/unitsdata';
import { variantattributesdata } from '../core/json/variantattributesdata';
import { warrentydata } from '../core/json/waarrentydata';
import { barcodedata } from '../core/json/barcodedata';
import { departmentlistdata } from '../core/json/departmentlistdata';
import { designationdata } from '../core/json/designationdata';
import { shiftlistdata } from '../core/json/shiftlistdata';
import { attendenceemployeedata } from '../core/json/attendence-employeedata';
import { invoicereportdata } from '../core/json/invoicereportdata';
import { salersretrunsdata } from '../core/json/salesreturn';
import { quotationlistdata } from '../core/json/quotationlistdata';
import { CustomerData } from '../core/json/customer_data';
import { SupplierData } from '../core/json/supplier_data';
import { ManageStocksdata } from '../core/json/managestocks_data';
import { StockTransferData } from '../core/json/stocktransferdata';
import { userlisadata } from '../core/json/users';
import { rolesandpermission } from '../core/json/rolesandpermissiondata';
import { deleteaccountdata } from '../core/json/deleteaccount';
import { attandanceadmindata } from '../core/json/attendanceadmindata';
import { leavesadmindata } from '../core/json/leavesadmin';
import { leavetypedata } from '../core/json/leavetypedata';
import { leavedata } from '../core/json/leavesdata';
import { expiredproduct } from '../core/json/expiredproductdata';
import { lowstockdata } from '../core/json/lowstockdata';
import { categorylist } from '../core/json/categorylistdata';
import { subcateorydata } from '../core/json/subcategorydata';
import { callhistorydata } from '../core/json/callhistorydata';
// import { products } from '../core/json/products';

export const initialState = {
  // products,
  dashboard_recentproduct: dashboarrecentproductddata,
  dashboard_expiredproduct: expiredproductdata,
  saleshdashboard_recenttransaction: salestransaction,
  brand_list: brandlistdata,
  unit_data: unitsdata,
  variantattributes_data: variantattributesdata,
  warranty_data: warrentydata,
  barcode_data: barcodedata,
  departmentlist_data: departmentlistdata,
  designation_data: designationdata,
  shiftlist_data: shiftlistdata,
  attendenceemployee_data: attendenceemployeedata,
  toggle_header: false,
  invoicereport_data: invoicereportdata,
  salesreturns_data: salersretrunsdata,
  quotationlist_data: quotationlistdata,
  customerdata: CustomerData,
  supplierdata: SupplierData,
  managestockdata: ManageStocksdata,
  stocktransferdata: StockTransferData,
  userlist_data: userlisadata,
  rolesandpermission_data: rolesandpermission,
  deleteaccount_data: deleteaccountdata,
  attendanceadmin_data: attandanceadmindata,
  leavesadmin_data: leavesadmindata,
  leavetypes_data: leavetypedata,
  holiday_data: leavedata,
  expiredproduct_data: expiredproduct,
  lowstock_data: lowstockdata,
  categotylist_data: categorylist,
  subcategory_data: subcateorydata,
  callhistory_data: callhistorydata,
  layoutstyledata: localStorage.getItem('layoutStyling'),
};
