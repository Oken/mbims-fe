/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';
import { ProductCategoryT } from '../../../types/product-types';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../../components/button';
import { Download, Upload, Plus } from 'react-feather';
import FeatherIcon from 'feather-icons-react';
import {
  // Queries
  useGetProductCategoriesQuery,

  // Mutations
  useDeleteProductCategoryMutation,

  // Selectors
  selectAllCategories,
} from '../../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../../custom-modal';
import EditCategoryForm from '../../components/button/forms/categories/edit-category';
import AddCategoryForm from '../../components/button/forms/categories/add-category';

const { Item: FormItem } = Form;
const Option = Select.Option;

const CategoryList = () => {
  const [form] = Form.useForm<FormInstance>();
  const [categories, setCategories] = useState<ProductCategoryT[]>([])
  const [createdNewCategory, setCreatedNewCategory] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ProductCategoryT | null>(null)

  const addCategoryModalRef = useRef<CustomModalRef>(null);
  const editCategoryModalRef = useRef<CustomModalRef>(null);

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

      if (isCategoryDeletionError) {
        MySwal.fire('Error', 'Failed to delete the category.', 'error');
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
          console.log('fetchedProductCategories: ', fetchedProductCategories, '\ncategories: ', categories);
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
  }, [
    isProductCategoryFetching,
    // Update category list after new is created or updated
    fetchedProductCategories,
    createdNewCategory,
  ]);

  const openAddCategoryModal = () => {
    addCategoryModalRef.current?.openModal();
  };

  const closeAddCategoryModal = () => {
    addCategoryModalRef.current?.closeModal();
  };

  const openEditCategoryModal = () => {
    editCategoryModalRef.current?.openModal();
  };

  const closeEditCategoryModal = () => {
    editCategoryModalRef.current?.closeModal();
  };

  const columns: ColumnsType<ProductCategoryT> = [
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
      render: (_, category: ProductCategoryT, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action" style={{ justifyContent: 'start' }}>
              <Link
                className="me-2"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => {
                  setCategoryToEdit(category);
                  openEditCategoryModal();
                  setCreatedNewCategory(false);
                }}
              >
                <FeatherIcon icon="edit" className="feather-edit" />
              </Link>
              <Link
                className="confirm-text"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => showConfirmationAlert(category.id)}
              >
                <FeatherIcon icon="trash-2" className="feather-trash-2" />
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
        ref={addCategoryModalRef}
        width={'400px'}
        content={<AddCategoryForm
          closeAddCategoryModal={closeAddCategoryModal}
          categoryName={''}
          setCreatedNewCategory={setCreatedNewCategory}
        />}
      />
      <CustomModal
        ref={editCategoryModalRef}
        width={'400px'}
        content={<EditCategoryForm
          closeEditCategoryModal={closeEditCategoryModal}
          category={categoryToEdit}
          setCreatedNewCategory={setCreatedNewCategory}
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
            <Row gutter={40} style={{
              width: '100%',
              margin: '0px 0px 20px 0px',
            }}
            >
              <Col span={10} style={{ paddingLeft: 0 }}>
                <div style={{ fontWeight: 500 }}>
                  {categories.length} categories
                </div>
              </Col>
              <Col span={14} style={{ paddingRight: 0 }}>
                <Row
                  gutter={40}
                  style={{
                    width: '100%',
                    margin: '0px 0px 20px 0px',
                  }}
                  justify={'end'}
                >
                  <Col style={{ maxWidth: 'fit-content' }}>
                    <CustomButton
                      backgroundColor="white"
                      textColor="#2D7DEE"
                      // className="search-button"
                    >
                      <Download className="me-2" />
                      Import Categories
                    </CustomButton>
                  </Col>
                  <Col style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton
                      backgroundColor="#2D7DEE"
                      textColor="white"
                      // className="search-button"
                      onClick={() => {
                        openAddCategoryModal();
                        setCreatedNewCategory(false);
                      }}
                    >
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
                <Row
                  gutter={40}
                  style={{ width: '100%', margin: '0px 0px 20px 0px' }}
                  justify={'space-between'}
                >
                  <Col span={12} style={{ paddingLeft: 0 }}>
                    <div style={{ display: 'flex' }}>
                      <Input
                        placeholder='Enter product name, sku or tag'
                        prefix={<SearchOutlined />}
                        style={{ width: 330, height: 42 }}
                      />
                      <CustomButton
                        backgroundColor="#F45D01"
                        textColor="#fff"
                        className="search-button"
                      // style={{ height: 42 }}
                      >
                        Search
                      </CustomButton>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Select
                        style={{ width: '100%', height: 42 }}
                        defaultValue="Last 6 Months"
                      >
                        <Option value='Last 6 Months' style={{ padding: '10px' }} selected>
                          Last 6 Months
                        </Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={6} style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton
                      backgroundColor="white"
                      textColor="#2D7DEE"
                      className="search-button"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Upload className="me-2" />
                      Export List
                    </CustomButton>
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
