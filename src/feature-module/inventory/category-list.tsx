/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../components/button';
import { Download, Upload, Plus } from 'react-feather';
import {
  // Queries
  useGetProductCategoriesQuery,

  // Mutations
  useEditProductCategoryMutation,
  useDeleteProductCategoryMutation,

  // Selectors
  selectAllCategories,
  selectCategoryById,
} from '../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../custom-modal';
import EditCategoryForm from '../components/button/forms/edit-category';
import AddCategoryForm from '../components/button/forms/add-category';

const { Item: FormItem } = Form;
const Option = Select.Option;

const CategoryList = () => {
  const [form] = Form.useForm<FormInstance>();
  const [expand, setExpand] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([])

  const categoryModalRef = useRef<CustomModalRef>(null);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const [, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const MySwal = withReactContent(Swal);

  const [deleteProductCategory, {
    isLoading: isCategoryDeletionLoading,
    isError: isCategoryDeletionError,
    isSuccess: isCategoryDeletionSuccess,
    error: categoryDeletionError,
  }] = useDeleteProductCategoryMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Delete this category?</h3>",
      text: 'You won\'t be able to revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D5E5FC',
      cancelButtonColor: '#FF3B3B',
      padding: '20px 10px',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        // Wait for product deletion
        const deletedCategory = await deleteProductCategory(id);
        console.log('deletedCategory: ', deletedCategory);
      } catch (error) {
        console.error('Error deleting category:', error, categoryDeletionError);
        MySwal.fire('Error', 'Failed to delete the category.', 'error');
      }
    } else {
      MySwal.close();
    }
  };

  // for deleting items
  useEffect(() => {
    const deletingProduct = async () => {
      // setLoading(true);
      if (isCategoryDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Category has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        return;
      }

      if (isCategoryDeletionLoading) {
        // Show deleting message
        await MySwal.fire({
          title: 'Please wait',
          text: 'Deleting...',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    };
    deletingProduct();
  }, [isCategoryDeletionLoading]);

  const {
    error: productCategoryError,
    isError: isProductCategoryFetchingError,
    isSuccess: isProductCategoryFetchingSuccess,
    isLoading: isProductCategoryFetching,
  } = useGetProductCategoriesQuery([]);
  const fetchedProductCategories = useSelector(selectAllCategories);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (isProductCategoryFetchingSuccess) {
          console.log('fetchedProducts: ', fetchedProductCategories);
          setCategories(fetchedProductCategories);
          return;
        }

        if (isProductCategoryFetchingError) {
          console.log('productCategoryError', productCategoryError);
          throw productCategoryError;
        }
      } catch (err) {
        console.error('Failed to fetch products: ', err);
      }
    };

    loadCategories();
  }, [isProductCategoryFetching]);

  const openCategoryModal = () => {
    categoryModalRef.current?.openModal();
  };

  const closeCategoryModal = () => {
    categoryModalRef.current?.closeModal();
  };

  const columns: ColumnsType<any> = [
    {
      title: 'name',
      dataIndex: 'name',
      render: (_, category, index) => (
        <Fragment key={index}>
          <span className="productimgname">
            {category.productCategoryName}
          </span>
        </Fragment>
      ),
      // sorter: (a, b) => a.category.length - b.category.length,
    },
    // {
    //   title: 'Category Slug',
    //   dataIndex: 'categoryslug',
    //   sorter: (a, b) => a.categoryslug.length - b.categoryslug.length,
    // },
    {
      title: 'Date Created',
      dataIndex: 'date-created',
      render: (_, category, index) => (
        <Fragment key={index}>
          <span className="productimgname">
          </span>
        </Fragment>
      ),
      // sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (text) => (
    //     <span className="badge badge-linesuccess">
    //       <Link to="#"> {text}</Link>
    //     </span>
    //   ),
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      render: (_, category, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action">
              <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-category">
                <i
                  data-feather="edit"
                  className="feather-edit"
                  onClick={ () => openCategoryModal() }
                ></i>
              </Link>
              <Link className="confirm-text p-2" to="#">
                <i data-feather="trash-2" className="feather-trash-2" onClick={() => showConfirmationAlert(category.id)}></i>
              </Link>
            </div>
          </div>
        </Fragment>
      ),
    },
  ];

  return (
    <>
      <CustomModal
        ref={categoryModalRef}
        width={'400px'}
        content={<EditCategoryForm
          closeCategoryModal={closeCategoryModal}
        />}
      />
      <div className="page-wrapper">
        <div className="content">
          <div>
            <Row style={{ width: '100%', marginBottom: 30 }}>
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Categories</h4>
                  <h6>Manage your categories</h6>
                </div>
              </div>
            </Row>
            <Row gutter={40} style={{ width: '100%', marginBottom: 20, justifyItems: 'flex-end' }}>
              <Col span={10}>
                <div style={{ fontWeight: 500 }}>
                  {categories.length} categories
                </div>
              </Col>
              <Col span={14}>
                <Row gutter={40} style={{ width: '100%' }}>
                  <Col span={12}>
                    <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                      <Download className="me-2" />
                      Import Categories
                    </CustomButton>
                  </Col>
                  <Col span={12}>
                    <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                      <Plus className="me-2" />
                      Add Category
                    </CustomButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
                <Row gutter={40} style={{ width: '100%' }}>
                  <Col span={12}>
                    <div style={{ display: 'flex' }}>
                      {/* <div> */}
                        <Input
                          placeholder='Enter product name, sku or tag'
                          prefix={<SearchOutlined />}
                          style={{ width: 330, height: 38 }}
                        />
                      {/* </div> */}
                      <CustomButton backgroundColor="#F45D01" textColor="#fff" className="search-button">
                        Search
                      </CustomButton>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Select
                        placeholder="Pick brand"
                        style={{ width: '100%', height: 38 }}
                      >
                        <Option value='6' style={{ padding: '10px' }} selected>
                          Last 6 Months
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <CustomButton backgroundColor="white" textColor="#2D7DEE" className="search-button">
                        <Upload className="me-2" />
                        Export List
                      </CustomButton>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive">
                <Table columns={columns} dataSource={categories} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
