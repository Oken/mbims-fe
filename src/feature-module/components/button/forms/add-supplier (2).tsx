/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  message
} from 'antd';
import {
  // mutations
  useAddNewBrandMutation,
} from '../../../../store/feature-slice/products';
import { ProductBrandT } from '../../../../types/product-types';

type AddBrandT = Omit<ProductBrandT, 'id'>;

interface AddBrandProps {
  closeAddBrandModal: () => void;
  brandName: string;
  setCreatedNewBrand: (value: boolean) => void;
}

const AddBrandForm = ({ closeAddBrandModal, brandName, setCreatedNewBrand }: AddBrandProps) => {
  const [form] = Form.useForm();
  const [productBrandName, setProductBrandName] = useState(brandName);

  // Update the form input when the brand name changes
  useEffect(() => {
    setProductBrandName(brandName);
  }, [brandName]);

  useEffect(() => {
    form.setFieldsValue({ productBrandName: productBrandName });
  }, [productBrandName]);

  console.log('\nproductBrandName: ', productBrandName, '\nbrandName: ', brandName);

  const [addNewBrand, { isLoading, isSuccess, isError, error }] = useAddNewBrandMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    try {
      const brand = {
        brandName: values.productBrandName,
        logo: values.logo || null,
        brandStatus: true,
      }

      console.log('brand to be submitted: ', brand);
      // setLoading(isLoading);
      const resBrand = await addNewBrand(brand).unwrap();
      console.log('resBrand: ', resBrand);
    } catch (err) {
      message.error('Failed to add brand');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const brandAdded = async () => {
      if (isSuccess) {
        setCreatedNewBrand(true);

        form.resetFields(); // Reset form after successful submission
        message.success('Brand added successfully');
        closeAddBrandModal();
      } else if(isError) {
        message.error('Failed to add brand');
        console.log('Failed to add brand: ', error);
      }
    }

    brandAdded();
  }, [isSuccess, isError]);

  return (
    <>
      <h2>Add Brand</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Form.Item name={'productBrandName'} label="Brand Name">
          <Input style={{ padding: '16px' }} value={productBrandName} />
        </Form.Item>

        {/* <Form.Item label="Slug" required>
          <Input
            value={category.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            style={{ padding: '15px' }}
          />
        </Form.Item>

        <Form.Item label="Category Status">
          <Switch checked={category.categoryStatus} onChange={(checked) => handleChange('categoryStatus', checked)} />
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: '100%', padding: '25px' }}
          >
            Add Brand
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBrandForm;
