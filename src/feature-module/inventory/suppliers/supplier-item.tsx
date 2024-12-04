import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row, Button, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { SupplierT } from '../../../types/product-types';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import {
  // Queries
  useGetProductSuppliersQuery,

  // Mutations
  useDeleteProductSupplierMutation,

  // Selectors
  selectAllSuppliers,
  selectSupplierById,
} from '../../../store/feature-slice/products';


const { Item: FormItem } = Form;

const SupplierDetail = () => {
  // Get the id of the supplier from the link
  const { supplierId } = useParams();
  const [form] = Form.useForm();

  // console.log('supplierId: ', supplierId);

  const navigate = useNavigate();

  const [supplier, setSupplier] = useState<SupplierT | null>(null);

  const MySwal = withReactContent(Swal);

  const {
    error: productSupplierError,
    isError: isProductSupplierFetchingError,
    isSuccess: isProductSupplierFetchingSuccess,
    isLoading: isProductSupplierFetching,
  } = useGetProductSuppliersQuery([]);
  const fetchedProductSuppliers = useSelector(selectAllSuppliers);

  const fetchedProductSupplier = useSelector((state) => {
    return selectSupplierById(state, Number(supplierId));
  });

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        if (isProductSupplierFetchingSuccess) {
          console.log('fetchedProductSuppliers: ', fetchedProductSuppliers, '\nsupplier: ', supplier);
          setSupplier(fetchedProductSupplier);
          return;
        }

        if (isProductSupplierFetchingError) {
          console.log('productSupplierError', productSupplierError);
          throw productSupplierError;
        }
      } catch (err) {
        console.error('Failed to fetch products: ', err);
      }
    };

    loadSupplier();
  }, [
    isProductSupplierFetching,
    // Update brand list after new is created or updated
    fetchedProductSuppliers,
  ]);

  const [deleteProductSupplier, {
    isLoading: isProductSupplierDeletionLoading,
    isError: isProductSupplierDeletionError,
    isSuccess: isProductSupplierDeletionSuccess,
    error: productSupplierDeletionError,
  }] = useDeleteProductSupplierMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Are you sure?</h3>",
      text: 'You won\'t be able to revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2D7DEE',
      cancelButtonColor: '#FF3B3B',
      padding: '20px 10px',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        // Wait for product deletion
        const deletedProductSupplier = await deleteProductSupplier(id);
        console.log('deletedProductSupplier: ', deletedProductSupplier);
      } catch (error) {
        console.error('Error deleting supplier:', error, productSupplierDeletionError);
        MySwal.fire('Error', 'Failed to delete the supplier.', 'error');
      }
    } else {
      MySwal.close();
    }
  };

  // for deleting items
  useEffect(() => {
    const deletingProductSupplier = async () => {
      // setLoading(true);
      if (isProductSupplierDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Supplier has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });

        // Go back
        navigate(-1);

        return;
      }

      if (isProductSupplierDeletionLoading) {
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
    deletingProductSupplier();
  }, [isProductSupplierDeletionLoading]);

  useEffect(() => {
    // form.setFieldValue('supplierId', supplier?.id);
    console.log('Ready to use supplier: ', supplier);
    form.setFieldValue('supplierName', supplier?.name);
    form.setFieldValue('phoneNumber', supplier?.phone);
    form.setFieldValue('email', supplier?.email);
    form.setFieldValue('address', supplier?.address);
    form.setFieldValue('city', supplier?.city);
    form.setFieldValue('country', supplier?.country);
  }, [supplier]);

  return (
    <div className="page-wrapper" style={{ background: '#F6F9FE', height: '100%' }}>
      <div className="content" style={{ paddingBottom: '20px' }}>
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Supplier Details</h4>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Button
                  style={{ background: '#868B90', padding: '16px' }}
                  type="primary"
                  onClick={() => navigate(-1)}
                >
                  <FeatherIcon icon="arrow-left" />
                  Back
                </Button>
              </div>
            </li>
            <li>
              <div className="page-btn">
                <Button
                  style={{ backgroundColor: 'red', height: 40, marginLeft: 15 }}
                  type="primary"
                  loading={isProductSupplierDeletionLoading}
                  onClick={() => showConfirmationAlert(supplier.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          </ul>
        </div>

        <Form
          form={form}
          layout="vertical"
          // onFinish={handleFinish}
        >
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-responsive" style={{ padding: 0, border: 0 }}>
                <div>
                  <Row gutter={40} style={{ margin: 0 }}>
                    <Col span={12} style={{ paddingLeft: 0 }}>
                      <FormItem>
                        <label style={{ paddingBottom: '8px' }}>
                          Supplier Name
                        </label>
                        <FormItem
                          name="supplierName"
                        >
                          <Input
                            style={{ padding: '16px' }}
                            readOnly
                          />
                        </FormItem>
                      </FormItem>
                    </Col>
                    <Col span={12} style={{ paddingRight: 0 }}>
                      <FormItem>
                        <label style={{ paddingBottom: '8px' }}>
                          Phone No
                        </label>
                        <FormItem name="phoneNumber">
                          <Input style={{ padding: '16px' }} readOnly />
                        </FormItem>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={40} style={{ margin: 0 }}>
                    <Col span={12} style={{ paddingLeft: 0 }}>
                      <FormItem>
                        <label style={{ paddingBottom: '8px' }}>
                          Email Address
                        </label>
                        <FormItem
                          name="email"
                        >
                          <Input
                            style={{ padding: '16px' }}
                            readOnly
                          />
                        </FormItem>
                      </FormItem>
                    </Col>
                    <Col span={12} style={{ paddingRight: 0 }}>
                      <FormItem>
                        <label style={{ paddingBottom: '8px' }}>
                          Address
                        </label>
                        <FormItem name="address">
                          <Input style={{ padding: '16px' }} readOnly />
                        </FormItem>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={40} style={{ margin: 0 }}>
                    <Col span={12} style={{ paddingLeft: 0 }}>
                      <FormItem>
                        <label style={{ paddingBottom: '8px' }}>
                          City
                        </label>
                        <FormItem
                          name="city"
                        >
                          <Input
                            style={{ padding: '16px' }}
                            readOnly
                          />
                        </FormItem>
                      </FormItem>
                    </Col>
                    <Col span={12} style={{ paddingRight: 0 }}>
                      <FormItem>
                        <label style={{ paddingBottom: '8px' }}>
                          Country
                        </label>
                        <FormItem name="country">
                          <Input style={{ padding: '16px' }} readOnly />
                        </FormItem>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default SupplierDetail;
