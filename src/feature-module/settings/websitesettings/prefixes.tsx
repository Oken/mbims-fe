// import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SettingsSideBar from '../settingssidebar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleShowHeader } from '../../../store/feature-slice/utils';
import FeatherIcon from 'feather-icons-react';

const Prefixes = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.slices.showHeader);

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
  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    {/* <RotateCcw /> */}
                    <FeatherIcon icon="rotate-ccw" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    to=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? 'active' : ''}
                    onClick={() => {
                      dispatch(toggleShowHeader());
                    }}
                  >
                    {/* <ChevronUp /> */}
                    <FeatherIcon icon="chevron-up" />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap">
                  <form>
                    <div className="setting-title">
                      <h4>Prefixes</h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Product (SKU)</label>
                          <input type="text" className="form-control" placeholder="SKU -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Supplier</label>
                          <input type="text" className="form-control" placeholder="SUP -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Purchase</label>
                          <input type="text" className="form-control" placeholder="PU -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Purchase Return</label>
                          <input type="text" className="form-control" placeholder="PR -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Sales</label>
                          <input type="text" className="form-control" placeholder="SA -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Sales Return</label>
                          <input type="text" className="form-control" placeholder="SR -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Customer</label>
                          <input type="text" className="form-control" placeholder="CT -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Expense</label>
                          <input type="text" className="form-control" placeholder="EX -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Stock Transfer</label>
                          <input type="text" className="form-control" placeholder="ST -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Stock Adjustmentt</label>
                          <input type="text" className="form-control" placeholder="SA -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Sales Order</label>
                          <input type="text" className="form-control" placeholder="SO -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">POS Invoice</label>
                          <input type="text" className="form-control" placeholder="PINV -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Estimation</label>
                          <input type="text" className="form-control" placeholder="EST -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Transaction</label>
                          <input type="text" className="form-control" placeholder="TRN -" />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="mb-3">
                          <label className="form-label">Employee</label>
                          <input type="text" className="form-control" placeholder="EMP -" />
                        </div>
                      </div>
                    </div>
                    <div className="prefix-settings">
                      <div className="modal-footer-btn">
                        <button
                          type="button"
                          className="btn btn-cancel me-2"
                          // data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <Link to="#" className="btn btn-submit">
                          Save Changes
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prefixes;
