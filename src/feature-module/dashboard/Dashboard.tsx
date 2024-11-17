import { ReactElement, useState } from 'react';
import CountUp from 'react-countup';
import { ArrowRight, File, User, UserCheck } from 'react-feather';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { all_routes } from '../../Router/all_routes';
// import withReactContent from 'sweetalert2-react-content';
// import Swal from 'sweetalert2';
import { useAppSelector } from '../../store/hooks';

// type ExpiredProductT = {
//   name: string;
//   sku: string;
//   image: string;
//   manufacturedDate: string | Date;
//   expiredDate: string | Date;
// };

type Summary1T = {
  title: string;
  image: string;
  count: {
    value: number;
    prefix: string;
  };
};

type Summary2T = {
  title: string;
  value: number;
  icon?: ReactElement;
  image?: ReactElement;
  classNames?: string;
};

// const expiredProduct: ExpiredProductT[] = [
//   {
//     name: 'Red Premium Handy',
//     sku: 'PT006',
//     image: 'assets/img/products/expire-product-01.png',
//     manufacturedDate: '17 Jan 2023',
//     expiredDate: '29 Mar 2023',
//   },
//   {
//     name: 'Iphone 14 Pro',
//     sku: 'PT006',
//     image: 'assets/img/products/expire-product-02.png',
//     manufacturedDate: '17 Jan 2023',
//     expiredDate: '29 Mar 2023',
//   },
//   {
//     name: 'Black Slim 200',
//     sku: 'PT006',
//     image: 'assets/img/products/expire-product-03.png',
//     manufacturedDate: '17 Jan 2023',
//     expiredDate: '29 Mar 2023',
//   },
//   {
//     name: 'Woodcraft Sandal',
//     sku: 'PT006',
//     image: 'assets/img/products/expire-product-04.png',
//     manufacturedDate: '17 Jan 2023',
//     expiredDate: '29 Mar 2023',
//   },
//   {
//     name: 'Apple Series 5 Watch',
//     sku: 'PT006',
//     image: 'assets/img/products/stock-img-03.png',
//     manufacturedDate: '17 Jan 2023',
//     expiredDate: '29 Mar 2023',
//   },
// ];

const summary1: Summary1T[] = [
  {
    title: 'Total Purchase Due',
    image: 'assets/img/icons/dash1.svg',
    count: { value: 307144, prefix: '₦' },
  },
  {
    title: 'Total Sales Due',
    image: 'assets/img/icons/dash2.svg',
    count: { value: 4385, prefix: '₦' },
  },
  {
    title: 'Total Sale Amount',
    image: 'assets/img/icons/dash3.svg',
    count: { value: 385656, prefix: '₦' },
  },
  {
    title: 'Total Expense Amount',
    image: 'assets/img/icons/dash4.svg',
    count: { value: 40000, prefix: '₦' },
  },
];

const summary2: Summary2T[] = [
  {
    title: 'customers',
    value: 100,
    icon: <User />,
  },
  {
    title: 'suppliers',
    value: 110,
    icon: <UserCheck />,
    classNames: 'das1',
  },
  {
    title: 'puchace invoice',
    value: 150,
    image: <ImageWithBasePath src="assets/img/icons/file-text-icon-01.svg" className="img-fluid" alt="icon" />,
    classNames: 'das2',
  },
  {
    title: 'sales invoice',
    value: 170,
    icon: <File />,
    classNames: 'das3',
  },
];

const options: ApexOptions = {
  series: [
    {
      name: 'Sales',
      data: [130, 210, 300, 290, 150, 50, 210, 280, 105],
    },
    {
      name: 'Purchase',
      data: [-150, -90, -50, -180, -50, -70, -100, -90, -105],
    },
  ],
  colors: ['#28C76F', '#EA5455'],
  chart: {
    type: 'bar',
    height: 320,
    stacked: true,
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 280,
      options: {
        legend: {
          position: 'bottom',
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4,
      borderRadiusApplication: 'end', // "around" / "end"
      borderRadiusWhenStacked: 'all', // "all"/"last"
      columnWidth: '20%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    min: -200,
    max: 300,
    tickAmount: 5,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  legend: { show: false },
  fill: {
    opacity: 1,
  },
};

const Dashboard = () => {
  const route = all_routes;
  const [chartOptions] = useState(options);

  const products = useAppSelector((state) => state.products.allData);

  // const MySwal = withReactContent(Swal);


  // const showConfirmationAlert = () => {
  //   MySwal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     showCancelButton: true,
  //     confirmButtonColor: '#00ff00',
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonColor: '#ff0000',
  //     cancelButtonText: 'Cancel',
  //   }).then((result) => {
  //     if (!result.isConfirmed) {
  //       MySwal.close();
  //       return;
  //     }

  //     MySwal.fire({
  //       title: 'Deleted!',
  //       text: 'Your file has been deleted.',
  //       // className: 'btn btn-success',
  //       confirmButtonText: 'OK',
  //       customClass: {
  //         confirmButton: 'btn btn-success',
  //       },
  //     });
  //   });
  // };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          {summary1.map((summary: Summary1T, idx: number) => (
            <div key={idx} className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="dash-widget w-100">
                <div className="dash-widgetimg">
                  <span>
                    <ImageWithBasePath src={`${summary.image}`} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    <CountUp start={0} end={summary.count.value} duration={3} prefix={summary.count.prefix} />
                  </h5>
                  <h6>{summary.title}</h6>
                </div>
              </div>
            </div>
          ))}

          {summary2.map((summary: Summary2T, idx: number) => (
            <div key={idx} className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className={`dash-count ${summary.classNames}`}>
                <div className="dash-counts">
                  <h4>{summary.value}</h4>
                  <h5>{summary.title}</h5>
                </div>
                <div className="dash-imgs">{summary.icon ? summary.icon : summary.image}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Button trigger modal */}

        <div className="row">
          <div className="col-xl-7 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Purchase &amp; Sales</h5>
                <div className="graph-sets">
                  <ul className="mb-0">
                    <li>
                      <span>Sales</span>
                    </li>
                    <li>
                      <span>Purchase</span>
                    </li>
                  </ul>
                  <div className="dropdown dropdown-wraper">
                    <button
                      className="btn btn-light btn-sm dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      2023
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
                <div id="sales_charts" />
                <Chart options={chartOptions} series={chartOptions.series} type="bar" height={320} />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-sm-12 col-12 d-flex">
            <div className="card flex-fill default-cover mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Top Products</h4>
                <div className="view-all-link">
                  <Link to="#" className="view-all d-flex align-items-center">
                    View All
                    <span className="ps-2 d-flex align-items-center">
                      <ArrowRight className="feather-16" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive dataview">
                  <table className="table dashboard-recent-products">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Products</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, idx) => (
                        <tr key={idx}>
                          <td>{idx}</td>
                          <td className="productimgname">
                            <Link to={route.productlist} className="product-img">
                              <ImageWithBasePath src="assets/img/products/stock-img-01.png" alt="product" />
                            </Link>
                            <Link to={route.productlist}>{product.product_name}</Link>
                          </td>
                          <td>₦{product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card">
          <div className="card-header">
            <h4 className="card-title">Expired Products</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive dataview">
              <table className="table dashboard-expired-products">
                <thead>
                  <tr>
                    <th className="no-sort">
                      <label className="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span className="checkmarks" />
                      </label>
                    </th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Manufactured Date</th>
                    <th>Expired Date</th>
                    <th className="no-sort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredProduct.map((product: ExpiredProductT, idx: number) => (
                    <tr key={idx}>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks" />
                        </label>
                      </td>
                      <td>
                        <div className="productimgname">
                          <Link to="#" className="product-img stock-img">
                            <ImageWithBasePath src={`${product.image}`} alt="product" />
                          </Link>
                          <Link to="#">{product.name}</Link>
                        </div>
                      </td>
                      <td>
                        <Link to="#">{product.sku}</Link>
                      </td>
                      <td>{product.manufacturedDate as string}</td>
                      <td>{product.expiredDate as string}</td>
                      <td className="action-table-data">
                        <div className="edit-delete-action">
                          <Link className="me-2 p-2" to="#">
                            <i data-feather="edit" className="feather-edit" />
                          </Link>
                          <Link className=" confirm-text p-2" to="#" onClick={showConfirmationAlert}>
                            <i data-feather="trash-2" className="feather-trash-2" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
