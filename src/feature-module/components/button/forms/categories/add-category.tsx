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
  useAddNewProductCategoryMutation,
} from '../../../../../store/feature-slice/products';
interface Category {
  productCategoryName: string;
  slug: string;
  categoryStatus: boolean;
}

interface AddCategoryProps {
  closeAddCategoryModal: () => void;
  categoryName: string;
  setCreatedNewCategory: (value: boolean) => void;
}

const AddCategoryForm = ({ closeAddCategoryModal, categoryName, setCreatedNewCategory }: AddCategoryProps) => {
  const [form] = Form.useForm();
  const [productCategoryName, setProductCategoryName] = useState(categoryName);

  // Update the form input when the category name changes
  useEffect(() => {
    setProductCategoryName(categoryName);
  }, [categoryName]);

  useEffect(() => {
    form.setFieldsValue({ productCategoryName: productCategoryName });
  }, [productCategoryName]);

  console.log('\nproductCategoryName: ', productCategoryName, '\ncategoryName: ', categoryName);

  const [addNewProductCategory, { isLoading, isSuccess, isError, error }] = useAddNewProductCategoryMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    try {
      const category = {
        productCategoryName: values.productCategoryName,
        slug: values.productCategoryName,
        categoryStatus: true,
      }

      console.log('category to be submitted: ', category);
      // setLoading(isLoading);
      const resCategory = await addNewProductCategory(category).unwrap();
      console.log('resCategory: ', resCategory);
    } catch (err) {
      message.error('Failed to add category');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const categoryAdded = async () => {
      if (isSuccess) {
        setCreatedNewCategory(true);

        form.resetFields(); // Reset form after successful submission
        message.success('Category added successfully');
        closeAddCategoryModal();
      } else if(isError) {
        message.error('Failed to add category');
        console.log('Failed to add category: ', error);
      }
    }

    categoryAdded();
  }, [isSuccess, isError]);

  return (
    <>
      <h2>Add Category</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Form.Item name={'productCategoryName'} label="Category Name">
        {/* <Form.Item label="Category Name"> */}
          <Input style={{ padding: '16px' }} value={productCategoryName} />
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
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCategoryForm;
