/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Form,
  Input,
  // Switch,
  message
} from 'antd';
import {
  // mutations
  useAddNewVariantAttributeMutation,
} from '../../../../../store/feature-slice/products';
import { VariantAttributeT } from '../../../../../types/product-types';

interface AddVariantAttributeProps {
  closeAddVariantAttributeModal: () => void;
  attributeName: string;
}

const AddVariantAttributeForm = ({
  closeAddVariantAttributeModal,
  attributeName,
}: AddVariantAttributeProps) => {
  const [form] = Form.useForm();
  const [variantAttributeName, setvariantAttributeName] = useState(attributeName);
  // const [category, setCategory] = useState<Category>({
  //   productCategoryName: productCategoryName,
  //   slug: productCategoryName,
  //   categoryStatus: true,
  // });


  useEffect(() => {
    setvariantAttributeName(attributeName);
  }, [attributeName]);

  console.log('\nvariantAttributeName: ', variantAttributeName, '\nattributeName: ', attributeName);

  const [addNewVariantAttribute, { isLoading, isSuccess, isError, error }] = useAddNewVariantAttributeMutation();

  const handleFinish = async (values: VariantAttributeT) => {
    // Handle form submission
    try {
      console.log('Attrubutes to be submitted: ', values);
      const resCategory = await addNewVariantAttribute(values).unwrap();
      console.log('resCategory: ', resCategory);
    } catch (err) {
      message.error('Failed to add attribute');
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const variantAttributeAdded = async () => {
      if (isSuccess) {
        form.resetFields(); // Reset form after successful submission
        message.success('Attribute added successfully');
        closeAddVariantAttributeModal();
      } else if(isError) {
        message.error('Failed to add attribute');
        console.log('Failed to add attribute: ', error);
      }
    }

    variantAttributeAdded();
  }, [isSuccess, isError]);

  return (
    <>
      <h2>Create a Variant</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Form.Item initialValue={variantAttributeName} name={'name'} label="Category Name">
          <Input style={{ padding: '16px' }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: '100%', padding: '25px' }}
          >
            Add Attribute
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddVariantAttributeForm;
