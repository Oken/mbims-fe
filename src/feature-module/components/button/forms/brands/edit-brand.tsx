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
  useEditBrandMutation,
} from '../../../../../store/feature-slice/products';
import { ProductBrandT } from '../../../../../types/product-types';

interface EditBrandProps {
  closeEditBrandModal: () => void;
  brand: ProductBrandT;
  setCreatedNewBrand: (value: boolean) => void;
}

const EditBrandForm = ({ closeEditBrandModal, brand, setCreatedNewBrand }: EditBrandProps) => {
  const [form] = Form.useForm();
  const [brandToEdit, setBrandToEdit] = useState(brand);
  const [
    productBrandName,
    setProductBrandName
  ] = useState(brand.brandName);

  // Update the form input when the brand changes
  useEffect(() => {
    setBrandToEdit(brand);
    setProductBrandName(brand.brandName);
  }, [brand]);

  // Updates the productBrandName with the most current value
  useEffect(() => {
    form.setFieldsValue({ productBrandName: productBrandName });
  }, [productBrandName]);

  console.log('\nproductBrandName: ', productBrandName, '\nbrand: ', brand);

  const [editBrand, { isLoading, isSuccess, isError, error }] = useEditBrandMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    try {
      const brandToAdd = {
        id: values.id ? values.id : brandToEdit.id,
        brandName: values.productBrandName ? values.productBrandName : brand.productBrandName,
        logo: null,
        brandStatus: true,
      }

      console.log('brandToAdd to be submitted: ', brand);
      // setLoading(isLoading);
      const resBrandToAdd = await editBrand(brandToAdd).unwrap();
      console.log('resBrandToAdd: ', resBrandToAdd);
    } catch (err) {
      message.error('Failed to add brand');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const brandEdited = async () => {
      if (isSuccess) {
        setCreatedNewBrand(true);

        form.resetFields(); // Reset form after successful submission
        message.success('Brand added successfully');
        closeEditBrandModal();
      } else if(isError) {
        message.error('Failed to add brand');
        console.log('Failed to add brand: ', error);
      }
    }

    brandEdited();
  }, [isSuccess, isError]);

  return (
    <>
      <h2>Edit Brand</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Form.Item name={'productBrandName'} label="Brand Name">
          <Input style={{ padding: '16px' }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: '100%', padding: '25px' }}
          >
            Edit Brand
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditBrandForm;
