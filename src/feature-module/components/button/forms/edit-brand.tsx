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
  useEditProductCategoryMutation,
} from '../../../../store/feature-slice/products';
import { ProductCategoryT } from '../../../../types/product-types';


interface Category {
  productCategoryName: string;
  slug: string;
  categoryStatus: boolean;
}

interface AddCategoryProps {
  closeEditCategoryModal: () => void;
  category: ProductCategoryT;
  setCreatedNewCategory: (value: boolean) => void;
}

const AddCategoryForm = ({ closeEditCategoryModal, category, setCreatedNewCategory }: AddCategoryProps) => {
  const [form] = Form.useForm();
  const [categoryToEdit, setCategoryToEdit] = useState(category);
  const [
    productCategoryName,
    setProductCategoryName
  ] = useState(category.productCategoryName);

  // Update the form input when the category name changes
  useEffect(() => {
    setCategoryToEdit(category);
    setProductCategoryName(category.productCategoryName);
  }, [category]);

  useEffect(() => {
    form.setFieldsValue({ productCategoryName: productCategoryName });
  }, [productCategoryName]);

  console.log('\nproductCategoryName: ', productCategoryName, '\ncategoryName: ', category);

  const [addEditProductCategory, { isLoading, isSuccess, isError, error }] = useEditProductCategoryMutation();

  const handleFinish = async (values: any) => {
    // Handle form submission
    try {
      const category = {
        id: categoryToEdit.id,
        productCategoryName: values.productCategoryName ?
                            values.productCategoryName : categoryToEdit.productCategoryName,
        slug: values.productCategoryName ?
                            values.productCategoryName : categoryToEdit.slug,
        categoryStatus: categoryToEdit.categoryStatus,
      }

      console.log('category to be submitted: ', category);
      // setLoading(isLoading);
      const resCategory = await addEditProductCategory(category).unwrap();
      console.log('resCategory: ', resCategory);
    } catch (err) {
      message.error('Failed to add category');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const categoryEdited = async () => {
      if (isSuccess) {
        setCreatedNewCategory(true);

        form.resetFields(); // Reset form after successful submission
        message.success('Category added successfully');
        closeEditCategoryModal();
      } else if(isError) {
        message.error('Failed to add category');
        console.log('Failed to add category: ', error);
      }
    }

    categoryEdited();
  }, [isSuccess, isError]);

  return (
    <>
      <h2>Edit Category</h2>
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: '100%', padding: '25px' }}
          >
            Edit Category
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCategoryForm;
