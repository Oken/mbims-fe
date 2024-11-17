import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { all_routes } from '../../Router/all_routes';
import Addunits from '../../core/modals/inventory/add-units';
import AddCategory from '../../core/modals/inventory/add-category';
import AddBrand from '../../core/modals/add-brand';
// import {
//   ArrowLeft,
//   Calendar,
//   ChevronDown,
//   ChevronUp,
//   Info,
//   LifeBuoy,
//   List,
//   PlusCircle,
//   Trash2,
//   X,
// } from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleShowHeader } from '../../store/feature-slice/utils';
import SelectStore from '../../core/modals/select-stores';
import { SetStateAction, useEffect, useState } from 'react';

const RequiredFieldStarSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M8.75 5.41667H6L7.95833 7.375L7.375 7.95833L5.41667 6V8.75H4.58333V5.95833L2.625 7.91667L2.04167 7.33333L3.91667 5.41667H1.25V4.58333H4L2.04167 2.625L2.625 2.04167L4.58333 4V1.25H5.41667V3.91667L7.33333 2L7.91667 2.625L5.95833 4.58333H8.75V5.41667Z"
      fill="#FF3B3B"
    />
  </svg>
);

const AddImageSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path
      d="M13.3333 56C11.8667 56 10.6116 55.4782 9.568 54.4347C8.52444 53.3911 8.00178 52.1351 8 50.6667V13.3333C8 11.8667 8.52267 10.6116 9.568 9.568C10.6133 8.52444 11.8684 8.00178 13.3333 8H50.6667C52.1333 8 53.3893 8.52267 54.4347 9.568C55.48 10.6133 56.0018 11.8684 56 13.3333V50.6667C56 52.1333 55.4782 53.3893 54.4347 54.4347C53.3911 55.48 52.1351 56.0018 50.6667 56H13.3333ZM13.3333 50.6667H50.6667V13.3333H13.3333V50.6667ZM16 45.3333H48L38 32L30 42.6667L24 34.6667L16 45.3333Z"
      fill="#0D1821"
      fill-opacity="0.3"
    />
  </svg>
);

const NairaSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M11.667 8.75H10.5003V12.25H9.33366L7.33866 8.75H4.66699V12.25H3.50033V8.75H2.33366V7.58333H3.50033V6.41667H2.33366V5.25H3.50033V1.75H4.66699L6.66783 5.25H9.33366V1.75H10.5003V5.25H11.667V6.41667H10.5003V7.58333H11.667V8.75ZM9.33366 8.75H8.67449L9.33366 9.89917V8.75ZM9.33366 7.58333V6.41667H7.33866L8.00366 7.58333H9.33366ZM4.66699 4.08333V5.25H5.33783L4.66699 4.08333ZM6.67366 7.58333L6.00283 6.41667H4.66699V7.58333H6.67366Z"
      fill="#0D1821"
    />
  </svg>
);

const DeleteSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5.00033 15.8333C5.00033 16.2754 5.17592 16.6993 5.48848 17.0118C5.80104 17.3244 6.22496 17.5 6.66699 17.5H13.3337C13.7757 17.5 14.1996 17.3244 14.5122 17.0118C14.8247 16.6993 15.0003 16.2754 15.0003 15.8333V5.83333H5.00033V15.8333ZM6.66699 7.5H13.3337V15.8333H6.66699V7.5ZM12.917 3.33333L12.0837 2.5H7.91699L7.08366 3.33333H4.16699V5H15.8337V3.33333H12.917Z"
      fill="#FF3B3B"
    />
  </svg>
);

const AddProductInput = ({
  label = '',
  placeholder = '',
  classes = '',
  type = 'text',
  options = [],
  helpText = '',
  rows = 5,
  isRequired = false,
}) => (
  <div className={`${type === 'textarea' ? 'col-lg-12' : 'col-lg-6 col-12'} ${classes}`}>
    <div className="add-product">
      <label className="form-label">
        {label} {type !== 'checkbox' && isRequired && RequiredFieldStarSvg}
      </label>
      {type === 'select' ? (
        <Select classNamePrefix="react-select" options={options} placeholder={placeholder} />
      ) : type === 'textarea' ? (
        <textarea className="form-control" placeholder={placeholder} rows={rows} />
      ) : (
        <input type={type} className="form-control" placeholder={placeholder} />
      )}
      {helpText && <p className="help-text">{helpText}</p>}
    </div>
  </div>
);

const Checkbox = ({ label = '' }) => (
  <div className="col-lg-12">
    <label className="checkboxs">
      <input type="checkbox" />
      <span className="checkmarks" />
      {label}
    </label>
  </div>
);

const ImageUpload = ({ label = '' }) => (
  <div className="accordion-item">
    <div className="accordion-header" id="headingThree">
      <div
        className="accordion-button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-controls="collapseThree"
      >
        <div className="addproduct-icon border-0 p-0 m-0 mt-4 list">
          <h5>{label}</h5>
        </div>
      </div>
    </div>
    <div className="accordion-collapse collapse show" aria-labelledby="headingThree">
      <div className="accordion-body">
        <div className="text-editor add-list add">
          <div className="col-lg-12">
            <div className="add-choosen">
              <div className="input-blocks">
                <label htmlFor="images" className="image-upload">
                  <input id="images" type="file" />
                  <div className="image-uploads">
                    {AddImageSvg}
                    <h4 className="text">Choose Image</h4>
                  </div>
                </label>
              </div>
              {/* Additional logic for displaying images */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AddProduct = () => {
  const route = all_routes;

  const data = useAppSelector((state) => state.slices.showHeader);

  const [, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
  };
  const [, setSelectedDate1] = useState(new Date());
  const handleDateChange1 = (date: SetStateAction<Date>) => {
    setSelectedDate1(date);
  };
  const renderCollapseTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  const store = [
    { value: 'choose', label: 'Choose' },
    { value: 'thomas', label: 'Thomas' },
    { value: 'rasmussen', label: 'Rasmussen' },
    { value: 'fredJohn', label: 'Fred John' },
  ];
  const warehouse = [
    { value: 'choose', label: 'Choose' },
    { value: 'legendary', label: 'Legendary' },
    { value: 'determined', label: 'Determined' },
    { value: 'sincere', label: 'Sincere' },
  ];
  const categories = [
    { value: 'choose', label: 'Choose' },
    { value: 'lenovo', label: 'Lenovo' },
    { value: 'electronics', label: 'Electronics' },
  ];
  const subcategory = [
    { value: 'choose', label: 'Choose' },
    { value: 'lenovo', label: 'Lenovo' },
    { value: 'electronics', label: 'Electronics' },
  ];
  const subsubcategories = [
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Computer', label: 'Computer' },
    { value: 'Shoes', label: 'Shoes' },
  ];
  const brands = [
    { value: 'choose', label: 'Choose' },
    { value: 'nike', label: 'Nike' },
    { value: 'bolt', label: 'Bolt' },
  ];
  const unit = [
    { value: 'choose', label: 'Choose' },
    { value: 'kg', label: 'Kg' },
    { value: 'pc', label: 'Pc' },
  ];
  const sellingtype = [
    { value: 'choose', label: 'Choose' },
    { value: 'transactionalSelling', label: 'Transactional selling' },
    { value: 'solutionSelling', label: 'Solution selling' },
  ];
  const barcodesymbol = [
    { value: 'choose', label: 'Choose' },
    { value: 'code34', label: 'Code34' },
    { value: 'code35', label: 'Code35' },
    { value: 'code36', label: 'Code36' },
  ];
  const taxtype = [
    { value: 'exclusive', label: 'Exclusive' },
    { value: 'salesTax', label: 'Sales Tax' },
  ];
  const discounttype = [
    { value: 'choose', label: 'Choose' },
    { value: 'percentage', label: 'Percentage' },
    { value: 'cash', label: 'Cash' },
  ];
  const discounttype1 = [
    { value: 'choose', label: 'Choose' },
    { value: 'percentage', label: 'Percentage' },
    { value: 'cash', label: 'Cash' },
  ];
  const [isImageVisible] = useState(true);

  // const handleRemoveProduct = () => {
  //   setIsImageVisible(false);
  // };

  const [isImageVisible1, setIsImageVisible1] = useState(true);

  const handleRemoveProduct1 = () => {
    setIsImageVisible1(false);
  };

  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [tags, setTags] = useState('');
  const [barcode, setBarcode] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      productName,
      sku,
      category,
      brand,
      tags,
      barcode,
      unitOfMeasure,
      supplier,
      description,
    };

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product created successfully');
      } else {
        alert('Error creating product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>New Product</h4>
                <h6>Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <div className="page-btn">
                  <Link to={route.productslist} className="btn m-1 btn-secondary">
                    {/* <ArrowLeft className="me-2" /> */}
                    <FeatherIcon icon="arrow-left" className="me-3" />
                    Back
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* /add */}
          <form>
            <div className="card">
              <div className="card-body add-product pb-0">
                <div className="accordion-card-one accordion" id="accordionExample">
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-controls="collapseOne"
                      >
                        <div className="addproduct-icon border-0">
                          <h5>
                            <span>Product Information</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div
                      // id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <AddProductInput isRequired={true} label="Product Name" placeholder="Enter product name" />
                          <AddProductInput isRequired={true} label="SKU" placeholder="Enter SKU" />
                          <AddProductInput isRequired={true} label="Category" type="select" options={[]} />
                          <AddProductInput label="Brand" type="select" options={[]} />
                          <AddProductInput
                            label="Tags"
                            placeholder="Enter tags"
                            helpText="Describe the product using keywords for easy filtering"
                          />
                          <AddProductInput
                            label="Barcode"
                            placeholder="Enter barcode"
                            helpText="Automatically generated if not entered"
                          />
                          <AddProductInput
                            isRequired={true}
                            label="Unit of Measure"
                            type="select"
                            options={[]}
                            helpText="Select the appropriate unit of measure"
                          />
                          <AddProductInput
                            label="Supplier"
                            type="select"
                            options={[]}
                            placeholder="Select a supplier"
                          />

                          {/* Textarea for Description */}
                          <AddProductInput
                            label="Description"
                            type="textarea"
                            placeholder="Enter product description"
                            helpText="Maximum 60 Characters"
                            rows={5} // You can adjust the number of rows as needed
                          />

                          <div className="composite-items">
                            <div className="d-flex flex-column">
                              <h6>Composite Item</h6>
                              <p>Select from existing products to be used as composite</p>
                            </div>

                            <div className="existing-products">
                              <div className="_header">
                                <h6>Component</h6>
                                <h6>Quantity</h6>
                                <h6>Cost</h6>
                                <h6>&nbsp;</h6>
                              </div>

                              <div className="existing-item">
                                <div className="_product-info">
                                  <div className="_product-details">
                                    <span className="_product-name">Shirt</span>
                                    <span className="_product-sku">SKU 10000</span>
                                  </div>
                                </div>
                                <div className="_quantity">
                                  <div className="quantity-box">
                                    <div className="quantity-text">1</div>
                                  </div>
                                </div>
                                <div className="_price">
                                  <div className="price-box">
                                    {NairaSvg}

                                    <div className="price-text">50,000</div>
                                  </div>
                                </div>
                                <div className="_delete">
                                  <div className="delete-box">
                                    <div className="delete-icon">{DeleteSvg}</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <AddProductInput
                              // label="Supplier"
                              type="select"
                              classes="col-lg-12"
                              options={[]}
                              placeholder="Select a supplier"
                            />
                          </div>

                          <AddProductInput
                            label="Store"
                            classes="col-lg-12"
                            type="select"
                            options={[]}
                            placeholder="All Stores"
                          />

                          <Checkbox label="Product to be sold on the point of sale" />
                          <Checkbox label="Does this item have an expiry date" />
                          <Checkbox label="Apply discounts on this item" />
                          <Checkbox label="This Item is Taxable" />

                          <ImageUpload label="Add Images" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 d-flex">
                <div className="btn-savetemplate">
                  <button type="button" className="save-template-btn">
                    Save Template
                  </button>
                  <Link to="#" data-bs-toggle="modal" data-bs-target="#edit-units" className="proceed-btn">
                    Proceed
                  </Link>
                </div>
              </div>
            </div>
          </form>
          {/* /add */}
        </div>
        <Addunits />
        <AddCategory />
        <AddBrand />
      </div>
      <SelectStore checkbox={<Checkbox label="Does this item have an expiry date" />} />
    </>
  );
};

export default AddProduct;
