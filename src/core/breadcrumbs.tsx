import { Link, useLocation } from 'react-router-dom';
import ImageWithBasePath from './img/imagewithbasebath';
import { PlusCircle, Printer } from 'react-feather';
import FeatherIcon from 'feather-icons-react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { ChevronUp } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleShowHeader } from '../store/feature-slice/utils';

type BreadCrumbs = {
  maintitle: string;
  subtitle: string;
  addButton?: string;
  importbutton?: string;
};

const BreadCrumbs = (props: BreadCrumbs) => {
  const location = useLocation();
  // const data = useSelector((state) => state.toggle_header);

  const { showHeader } = useAppSelector((state) => state.slices);

  let addButton = null;
  const dispatch = useAppDispatch();

  const renderTooltip = (props: TooltipProps) => (
    <Tooltip id="pdf-tooltip" {...props}>
      Pdf
    </Tooltip>
  );
  const renderExcelTooltip = (props: TooltipProps) => (
    <Tooltip id="excel-tooltip" {...props}>
      Excel
    </Tooltip>
  );
  const renderPrinterTooltip = (props: TooltipProps) => (
    <Tooltip id="printer-tooltip" {...props}>
      Printer
    </Tooltip>
  );
  const renderRefreshTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  if (location.pathname === '/product-list' || location.pathname === '/stock-transfer') {
    addButton = (
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{props.maintitle}</h4>
            <h6>{props.subtitle}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf">
              <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
            </Link>
          </li>
          <li>
            <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Excel">
              <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
            </Link>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                <i data-feather="printer" className="feather-printer" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                {/* <RotateCcw /> */}
                <FeatherIcon icon="rotate-ccw" />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
        <div className="page-btn">
          <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-units">
            <PlusCircle className="me-2" />
            {props.addButton}
          </Link>
        </div>
        <div className="page-btn import">
          <Link to="#" className="btn btn-added color" data-bs-toggle="modal" data-bs-target="#view-notes">
            {/* <Download className="me-2" /> */}
            <FeatherIcon icon="download" className="me-2" />
            {props.importbutton}
          </Link>
        </div>
      </div>
    );
  } else if (
    location.pathname === '/sales-report' ||
    location.pathname === '/call-history' ||
    location.pathname === '/inventory-report' ||
    location.pathname === '/purchase-report' ||
    location.pathname === '/customer-report' ||
    location.pathname === '/supplier-report' ||
    location.pathname === '/income-report' ||
    location.pathname === '/tax-report' ||
    location.pathname === '/expense-report' ||
    location.pathname === '/profit-loss-report' ||
    location.pathname === '/invoice-report'
  ) {
    addButton = (
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{props.maintitle}</h4>
            <h6>{props.subtitle}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <Link to="#">
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                <Printer />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                {/* <RotateCcw /> */}
                <FeatherIcon icon="rotate-ccw" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
              <Link
                to="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                id="collapse-header"
                className={showHeader ? 'active' : ''}
                onClick={() => {
                  dispatch(toggleShowHeader());
                }}
              >
                <ChevronUp />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
    );
  } else if (
    location.pathname == '/expense-list' ||
    location.pathname == '/expense-category' ||
    location.pathname == '/customers' ||
    location.pathname == '/warehouse' ||
    location.pathname == '/store-list' ||
    location.pathname == '/suppliers' ||
    location.pathname == '/manage-stocks' ||
    location.pathname == '/stock-adjustment'
  ) {
    addButton = (
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>{props.maintitle}</h4>
            <h6>{props.subtitle}</h6>
          </div>
        </div>
        <ul className="table-top-head">
          <li>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <Link to="#">
                <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                <i data-feather="printer" className="feather-printer" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                {/* <RotateCcw /> */}
                <FeatherIcon icon="rotate-ccw" />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
              <Link
                to="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                id="collapse-header"
                className={showHeader ? 'active' : ''}
                onClick={() => {
                  dispatch(toggleShowHeader());
                }}
              >
                <ChevronUp />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
        <div className="page-btn">
          <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-units">
            <PlusCircle className="me-2" />
            {props.addButton}
          </Link>
        </div>
      </div>
    );
  }

  return <>{addButton}</>;
};

export default BreadCrumbs;
