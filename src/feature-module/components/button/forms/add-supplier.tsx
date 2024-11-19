/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Select,
} from 'antd';
import {
  // Queries
  useGetCountriesQuery,

  // Mutations
  useAddNewProductSupplierMutation,

  // Selectors
  selectAllCountries,
} from '../../../../store/feature-slice/products';
import { CountryT } from '../../../../types/product-types';

interface Category {
  productCategoryName: string;
  slug: string;
  categoryStatus: boolean;
}

const { Item: FormItem } = Form;
const { Option } = Select;

interface AddSupplierProps {
  closeSupplierModal: () => void;
  supplierName: string;
  setCreatedNewSupplier: (value: boolean) => void;
}

const AddSupplierForm = ({ closeSupplierModal, supplierName, setCreatedNewSupplier }: AddSupplierProps) => {
  const [form] = Form.useForm();
  const [productSupplierName, setProductSupplierName] = useState(supplierName);
  const [countries, setCountries] = useState<CountryT[]>([]);

  // Update the form input when the category name changes
  useEffect(() => {
    setProductSupplierName(supplierName);
  }, [supplierName]);

  useEffect(() => {
    form.setFieldsValue({ productCategoryName: productSupplierName });
  }, [productSupplierName]);

  const {
    error: countryError,
    isError: isCountryFetchingError,
    isSuccess: isCountryFetchingSuccess,
    isLoading: isCountryFetching,
  } = useGetCountriesQuery([]);
  const fetchedCountries = useSelector(selectAllCountries);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        if (
          isCountryFetchingSuccess
        ) {
          setCountries(fetchedCountries);
        }

        if (isCountryFetchingError) {
          console.log('countryError', countryError);
          throw countryError;
        }
      } catch (err) {
        console.log('Failed to fetch countries.', err);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, [
    isCountryFetching,
  ]);


  console.log('\nproductSupplierName: ', productSupplierName, '\ncategoryName: ', supplierName);

  const [addNewProductSupplier, { isLoading, isSuccess, isError, error }] = useAddNewProductSupplierMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    try {
      const supplierData = {
        name: values.supplierName,
        email: values.email ? values.email : null,
        phone: values.phoneNumber ? values.phoneNumber : null,
        address: values.address ? values.address : null,
        city: values.city,
        country: values.country,
        description: values.description ? values.description : null,
        imageUrl: null,
      };

      console.log('supplier to be submitted: ', supplierData);
      // setLoading(isLoading);
      const resSupplier = await addNewProductSupplier(supplierData).unwrap();
      console.log('resSupplier: ', resSupplier);
    } catch (err) {
      message.error('Failed to add supplier');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const supplierAdded = async () => {
      if (isSuccess) {
        setCreatedNewSupplier(true);

        form.resetFields(); // Reset form after successful submission
        message.success('Supplier added successfully');
        closeSupplierModal();
      } else if(isError) {
        message.error('Failed to add supplier');
        console.log('Failed to add supplier: ', error);
      }
    }

    supplierAdded();
  }, [isSuccess, isError]);

  return (
    <>
      <h2>Add Supplier</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{
          padding: '10px'
        }}>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                Supplier Name <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="supplierName"
                rules={[{ required: true, message: 'Store name is required' }]}
              >
                <Input
                  placeholder="Enter outlet name" style={{ padding: '16px' }}
                  value={productSupplierName}
                />
              </FormItem>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="phoneNumber" label="Phone No">
              <Input placeholder="Enter Phone Number" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={24}>
            <FormItem name="email" label="Email Address">
              <Input placeholder="Enter Email Address" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={24}>
            <FormItem name="address" label="Address">
              <Input placeholder="Enter supplier address" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={12}>
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                City <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="city"
                noStyle
                rules={[{
                  required: true, message: 'City is required'
                }]}
              >
                <Input placeholder="Enter city" style={{ padding: '16px' }} />
              </FormItem>
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                Country <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="country"
                noStyle
                rules={[{
                  required: true, message: 'Country is required'
                }]}
              >
                <Select placeholder="Select country" style={{ height: 56.5 }}>
                  {countries.map((country) => (
                    <Option key={country.id} value={country.countryName}>
                      {country.countryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </FormItem>
          </Col>
        </Row>

        {/* {loading && <div style={{ textAlign: 'center' }}>Loading...</div>} */}

        <Button
          type="primary"
          htmlType="submit"
          style={{
            margin: '15px auto',
            height: 56.5,
            width: 300,
            display: 'block',
          }}
          loading={isLoading}
        >
          Save
        </Button>
      </Form>
    </>
  );
};

export default AddSupplierForm;
