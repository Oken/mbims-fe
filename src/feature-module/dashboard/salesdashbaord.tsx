/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, Calendar, ChevronUp, Clock, RotateCcw } from 'react-feather';

import CountUp from 'react-countup';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import DateRangePicker from 'react-bootstrap-daterangepicker';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Link } from 'react-router-dom';
import { setToogleHeader } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-bootstrap';
import { all_routes } from '../../Router/all_routes';
// import { Box } from '@mui/material';

// styles
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-daterangepicker/daterangepicker.css';

const SalesDashbaord = () => {
  const route = all_routes;
  //const data = useSelector((state) => state.saleshdashboard_recenttransaction);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.toggle_header);

  const renderRefreshTooltip = (props: any) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props: any) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  const chartOptions: ApexOptions = {
    series: [{ name: 'Sales Analysis', data: [25, 30, 18, 15, 22, 20, 30, 20, 22, 18, 15, 20] }],
    chart: {
      height: 273,
      type: 'area',
      zoom: { enabled: false },
    },
    colors: ['#FF9F43'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: '',
      align: 'left',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
      labels: {
        formatter: (val: number) => {
          return val / 1 + 'K';
        },
      },
    },
    legend: {
      position: 'top', // Allowed position
      // horizontalAlign: 'center', // Allowed alignment
      // position: 'top' as 'top' | 'bottom' | 'left' | 'right' | undefined,
      // horizontalAlign: 'left' as 'top' | 'center' | 'left' | undefined,
    },
  };

  // const initialSettings = {
  //   endDate: new Date('2020-08-11T12:30:00.000Z'),
  //   ranges: {
  //     'Last 30 Days': [new Date('2020-07-12T04:57:17.076Z'), new Date('2020-08-10T04:57:17.076Z')],
  //     'Last 7 Days': [new Date('2020-08-04T04:57:17.076Z'), new Date('2020-08-10T04:57:17.076Z')],
  //     'Last Month': [new Date('2020-06-30T18:30:00.000Z'), new Date('2020-07-31T18:29:59.999Z')],
  //     'This Month': [new Date('2020-07-31T18:30:00.000Z'), new Date('2020-08-31T18:29:59.999Z')],
  //     Today: [new Date('2020-08-10T04:57:17.076Z'), new Date('2020-08-10T04:57:17.076Z')],
  //     Yesterday: [new Date('2020-08-09T04:57:17.076Z'), new Date('2020-08-09T04:57:17.076Z')],
  //   },
  //   startDate: new Date('2020-08-04T04:57:17.076Z'), // Set "Last 7 Days" as default
  //   timePicker: false,
  // };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="welcome d-lg-flex align-items-center justify-content-between">
            <div className="align-items-center welcome-text">
              <h3 className="d-flex align-items-center">
                <ImageWithBasePath src="assets/img/icons/hi.svg" alt="img" />
                {/* !TODO Not to self
                  This name will be coming from the userState 
                */}
                &nbsp;Hi John Smilga,
              </h3>
              <h6 style={{ marginLeft: '2px' }}>Here&apos;s what&apos;s happening with your store today.</h6>
            </div>
            <div className="d-flex align-items-center">
              {/* <div className="position-relative daterange-wraper me-2">
                <div className="input-groupicon calender-input">
                  <DateRangePicker initialSettings={initialSettings}>
                    <input className="form-control col-4 input-range" type="text" style={{ border: 'none' }} />
                  </DateRangePicker>
                </div>
                <Calendar className="feather-14" />
              </div> */}

              {/* <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top">
                  <RotateCcw className="feather feather-rotate-ccw feather-16" />
                </Link>
              </OverlayTrigger> */}

              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  to="#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  id="collapse-header"
                  className={data ? 'active' : ''}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </div>
          </div>
          <div className="row sales-cards">
            <div className="col-xl-6 col-sm-12 col-12">
              <div className="card d-flex align-items-center justify-content-between default-cover mb-4">
                <div>
                  <h6>Weekly Earning</h6>
                  <h3>
                    $
                    <span className="counters" data-count="95000.45">
                      95000.45
                    </span>
                  </h3>
                  <p className="sales-range">
                    <span className="text-success">
                      <ChevronUp className="feather-16" />
                      48%&nbsp;
                    </span>
                    increase compare to last week
                  </p>
                </div>
                <ImageWithBasePath src="assets/img/icons/weekly-earning.svg" alt="img" />
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-primary mb-4">
                <ImageWithBasePath src="assets/img/icons/total-sales.svg" alt="img" />
                <h3>
                  {' '}
                  <CountUp end={10000} duration={4}>
                    {() => '+'}
                  </CountUp>
                </h3>
                <p>No of Total Sales</p>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="#" data-bs-toggle="tooltip" className="feather-dashboard">
                    <RotateCcw className="feather-16" />
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card color-info bg-secondary mb-4">
                <ImageWithBasePath src="assets/img/icons/purchased-earnings.svg" alt="img" />
                <h3>
                  <CountUp end={800} duration={4}>
                    {() => '+'}
                  </CountUp>
                </h3>
                <p>No of Total Sales</p>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" className="feather-dashboard">
                    <RotateCcw className="feather-16" />
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4 d-flex">
              <div className="card flex-fill default-cover w-100 mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Best Seller</h4>
                  <div className="dropdown">
                    <Link to="#" className="view-all d-flex align-items-center">
                      View All
                      <span className="ps-2 d-flex align-items-center">
                        <ArrowRight className="feather-16" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless best-seller">
                      <tbody>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/stock-img-01.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Lenovo 3rd Generation</Link>
                                <p className="dull-text">$4420</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="head-text">Sales</p>
                            6547
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/stock-img-06.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Bold V3.2</Link>
                                <p className="dull-text">$1474</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="head-text">Sales</p>
                            3474
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/stock-img-02.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Nike Jordan</Link>
                                <p className="dull-text">$8784</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="head-text">Sales</p>
                            1478
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/stock-img-03.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Apple Series 5 Watch</Link>
                                <p className="dull-text">$3240</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="head-text">Sales</p>
                            987
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/stock-img-04.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Amazon Echo Dot</Link>
                                <p className="dull-text">$597</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="head-text">Sales</p>
                            784
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-8 d-flex">
              <div className="card flex-fill default-cover w-100 mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Recent Transactions</h4>
                  <div className="dropdown">
                    <Link to="#" className="view-all d-flex align-items-center">
                      View All
                      <span className="ps-2 d-flex align-items-center">
                        <ArrowRight className="feather-16" />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless recent-transactions">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Order Details</th>
                          <th>Payment</th>
                          <th>Status</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/stock-img-05.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Lobar Handy</Link>
                                <span className="dull-text d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Paypal</span>
                            <span className="text-blue">#416645453773</span>
                          </td>
                          <td>
                            <span className="badge background-less border-success">Success</span>
                          </td>
                          <td>$1,099.00</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/expire-product-01.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Red Premium Handy</Link>
                                <span className="dull-text d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  10 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Apple Pay</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge background-less border-danger">Canceled</span>
                          </td>
                          <td>$600.55</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/expire-product-02.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Iphone 14 Pro</Link>
                                <span className="dull-text d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  10 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Stripe</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge background-less border-primary">Pending</span>
                          </td>
                          <td>$1,099.00</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/expire-product-03.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Black Slim 200</Link>
                                <span className="dull-text d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  10 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">PayU</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge background-less border-success">Success</span>
                          </td>
                          <td>$1,569.00</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <div className="product-info">
                              <Link to={route.productslist} className="product-img">
                                <ImageWithBasePath src="assets/img/products/expire-product-04.png" alt="product" />
                              </Link>
                              <div className="info">
                                <Link to={route.productslist}>Woodcraft Sandal</Link>
                                <span className="dull-text d-flex align-items-center">
                                  <i data-feather="clock" className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Paytm</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge background-less border-success">Success</span>
                          </td>
                          <td>$1,478.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button trigger modal */}
          <div className="row sales-board">
            <div className="col-md-12 col-lg-7 col-sm-12 col-12">
              <div className="card flex-fill default-cover">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Sales Analytics</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="dropdown-sales"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Calendar className="feather-14" />
                        2023
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdown-sales">
                        <li>
                          <Link to="#" className="dropdown-item">
                            2023
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2022
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2021
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales-analysis" className="chart-set" />
                  <ReactApexChart type="area" options={chartOptions} series={chartOptions.series} height={273} />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-5 col-sm-12 col-12">
              {/* World Map */}
              <div className="card default-cover">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Sales by Countries</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="dropdown-country-sales"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        This Week
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdown-country-sales">
                        <li>
                          <Link to="#" className="dropdown-item">
                            This Month
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            This Year
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales_db_world_map" style={{ height: '265px' }}>
                    <iframe
                      src="https://www.google.com/maps/embed"
                      style={{ border: '0', height: '265px', width: '364px' }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="contact-map"
                    />
                  </div>

                  <p className="sales-range">
                    <span className="text-success">
                      <ChevronUp className="feather-16" />
                      48%&nbsp;
                    </span>
                    increase compare to last week
                  </p>
                </div>
              </div>
              {/* /World Map */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashbaord;
