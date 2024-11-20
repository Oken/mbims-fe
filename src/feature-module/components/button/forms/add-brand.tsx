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
interface Category {
  productCategoryName: string;
  slug: string;
  categoryStatus: boolean;
}

interface AddCategoryProps {
  closeAddBrandModal: () => void;
  brandName: string;
  setCreatedNewBrand: (value: boolean) => void;
}

const AddCategoryForm = ({ closeAddBrandModal, brandName, setCreatedNewBrand }: AddCategoryProps) => {
  const [form] = Form.useForm();
  const [productBrandName, setProductBrandName] = useState(brandName);

  // Update the form input when the category name changes
  useEffect(() => {
    setProductBrandName(brandName);
  }, [brandName]);

  useEffect(() => {
    form.setFieldsValue({ productBrandName: productBrandName });
  }, [productBrandName]);

  console.log('\nproductBrandName: ', productBrandName, '\nbrandName: ', brandName);

  const [addNewProductCategory, { isLoading, isSuccess, isError, error }] = useAddNewBrandMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    // try {
    //   const category = {
    //     productCategoryName: values.productCategoryName,
    //     slug: values.productCategoryName,
    //     categoryStatus: true,
    //   }

    //   console.log('category to be submitted: ', category);
    //   // setLoading(isLoading);
    //   const resCategory = await addNewProductCategory(category).unwrap();
    //   console.log('resCategory: ', resCategory);
    // } catch (err) {
    //   message.error('Failed to add category');
    //   console.log('err: ', err);
    // }
  };

  useEffect(() => {
    const categoryAdded = async () => {
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

    categoryAdded();
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
        <Form.Item name={'productCategoryName'} label="Category Name">
        {/* <Form.Item label="Category Name"> */}
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

export default AddCategoryForm;
