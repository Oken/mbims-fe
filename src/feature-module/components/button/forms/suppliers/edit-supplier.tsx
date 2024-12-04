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
  Upload,
} from 'antd';
import {
  // Queries
  useGetCountriesQuery,

  // Mutations
  useEditProductSupplierMutation,

  // Selectors
  selectAllCountries,
} from '../../../../../store/feature-slice/products';
import { CountryT, SupplierT } from '../../../../../types/product-types';
import type { RcFile, UploadProps, UploadFile } from 'antd/es/upload';
import { beforeUpload, uploadButton, } from '../../../../../upload/images';

const { Item: FormItem } = Form;
const { Option } = Select;

interface AddSupplierProps {
  closeEditSupplierModal: () => void;
  supplier: SupplierT | null;
  setCreatedNewSupplier: (value: boolean) => void;
}

const AddSupplierForm = ({ closeEditSupplierModal, supplier, setCreatedNewSupplier }: AddSupplierProps) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [supplierToEdit, setSupplierToEdit] = useState(supplier);

  // Handle Image Upload
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newImageList }) => {
    console.log('Image List: ', newImageList);
    setImageList(newImageList);
  }

  // Update the form input when the supplier changes
  useEffect(() => {
    setSupplierToEdit(supplier);
  }, [supplier]);

  // console.log('supplierToEdit: ', supplierToEdit, 'supplier: ', supplier);

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

  const [editProductSupplier, { isLoading, isSuccess, isError, error }] = useEditProductSupplierMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    try {
      // Create a new FormData instance
      let data = new FormData();

      // const supplierImages = imageList.map((image) => image.originFileObj as RcFile);

      const supplierData = {
        id: values.supplierId,
        name: values.supplierName,
        email: values.email ? values.email : null,
        phone: values.phoneNumber ? values.phoneNumber : null,
        address: values.address ? values.address : null,
        city: values.city,
        country: values.country,
        description: values.description ? values.description : null,
        imageUrl: values.supplierImages,
      };

      data.append('request', JSON.stringify(supplierData));

      // supplierImages.forEach((image: File) => {
      //   data.append('content', image);
      // })

      console.log('supplier to be submitted: ', supplierData);
      console.log('data: ', [...data.entries()]);

      // return;

      // Start the creation
      const resSupplier = await editProductSupplier(supplierData).unwrap();
      console.log('resSupplier: ', resSupplier);
    } catch (err) {
      message.error('Failed to edit supplier');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const supplierAdded = async () => {
      if (isSuccess) {
        setCreatedNewSupplier(true);

        form.resetFields(); // Reset form after successful submission
        message.success('Supplier edited successfully');
        closeEditSupplierModal();
      } else if (isError) {
        message.error('Failed to edit supplier');
        console.log('Failed to edit supplier: ', error);
      }
    }

    supplierAdded();
  }, [isSuccess, isError]);

  // Populate the fields with the most current item
  useEffect(() => {
    form.setFieldValue('supplierId', supplierToEdit?.id);
    form.setFieldValue('supplierName', supplierToEdit?.name);
    form.setFieldValue('phoneNumber', supplierToEdit?.phone);
    form.setFieldValue('email', supplierToEdit?.email);
    form.setFieldValue('address', supplierToEdit?.address);
    form.setFieldValue('city', supplierToEdit?.city);
    form.setFieldValue('country', supplierToEdit?.country);
    form.setFieldValue('supplierImages', supplierToEdit?.imageUrl);
  }, [supplierToEdit]);

  return (
    <>
      <h2>Edit Supplier</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{
          padding: '10px'
        }}
      >
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
                />
              </FormItem>
              <FormItem
                name="supplierId"
                hidden
              >
                <Input
                  placeholder="Enter outlet name" style={{ padding: '16px' }}
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
        <Row gutter={40}>
          <Col span={24}>
            {/*<FormItem
              name={`supplierImages`}
              valuePropName='fileList'
              getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                beforeUpload={beforeUpload}
                onChange={handleImageChange}
                style={{ width: '200px' }}
              >
                {uploadButton}
              </Upload>
            </FormItem>*/}
            <FormItem name={`supplierImages`} hidden>
              
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
