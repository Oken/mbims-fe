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
  useAddNewProductSubcategoryMutation
} from '../../../../../store/feature-slice/products';
// import { Dispatch } from '@reduxjs/toolkit';
import {
  ProductSubcategoryT,
} from '../../../../../types/product-types';

type Subcategory = Omit<ProductSubcategoryT, 'id'>;

interface AddSubcategoryProps {
  // setProductCategoryId: Dispatch<SetStateAction<string>>;
  closeSubcategoryModal: any;
  setProductSubcategoryId: any;
  subcategoryName: string;
  refetchProductSubcategories: any,
  setSubcategoryItems: any;
  productCategoryId: number;
  selectAllSubcategories: any,
}

const { TextArea } = Input;

const AddSubcategoryForm = ({
  closeSubcategoryModal,
  subcategoryName,
  setProductSubcategoryId,
  refetchProductSubcategories,
  setSubcategoryItems,
  productCategoryId,
  selectAllSubcategories,
}: AddSubcategoryProps) => {
  const [form] = Form.useForm();
  const [productSubcategoryName, setProductSubcategoryName] = useState(subcategoryName);
  const [productSubcategoryCode, setProductSubcategoryCode] = useState<string>('');
  const [subcategoryDescription, setSubcategoryDescription] = useState('');
  const [subcategory, setSubcategory] = useState<Subcategory>({
    categoryName: productSubcategoryName,
    subCatCode: productSubcategoryCode,
    subCatDescription: subcategoryDescription,
    subCatStatus: true,
    productCategoryId: productCategoryId,
  });

  // Gets the subcategory code form the name
  const getSubcatCode = () => {
    return productSubcategoryName.slice(0, 3).toUpperCase();
  }

  useEffect(() => {
    setProductSubcategoryCode(getSubcatCode());
    console.log('productSubcategoryCode: ', productSubcategoryCode);
  }, [productSubcategoryName]);

  useEffect(() => {
    setProductSubcategoryName(subcategoryName);
  }, [subcategoryName]);

  useEffect(() => {
    setSubcategory({
      categoryName: productSubcategoryName,
      subCatCode: productSubcategoryCode,
      subCatDescription: subcategoryDescription,
      subCatStatus: true,
      productCategoryId: productCategoryId,
    });
  }, [
    productSubcategoryName,
    productSubcategoryCode,
    subcategoryDescription,
  ]);

  console.log('\nproductSubcategoryName: ', productSubcategoryName, '\nsubcategoryName: ', subcategoryName, '\nsubcategory: ', subcategory);

  // const handleChange = (field: keyof Category, value: any) => {
  //   setCategory((prev) => ({ ...prev, [field]: value }));
  // };

  const handleChange = (field: keyof Subcategory, value: any) => {
    setProductSubcategoryName(value);
  };

  const [
    addNewSubcategory,
    { isLoading, isSuccess }
  ] = useAddNewProductSubcategoryMutation();

  const handleFinish = async () => {
    // Handle form submission
    try {
      console.log('isLoading: ', isLoading);
      // setLoading(isLoading);
      const resSubcategory = await addNewSubcategory(subcategory).unwrap();
      console.log('resCategory: ', resSubcategory);

      if (isSuccess) {
        message.success('subcategory added successfully');
        await refetchProductSubcategories();
        const subcategoryList =useSelector(selectAllSubcategories);
        setSubcategoryItems(subcategoryList);
        form.resetFields(); // Reset form after successful submission
        // closeCategoryModal();
      }
    } catch (err) {
      message.error('Failed to add subcategory');
      console.log('err: ', err);
    }
  };

  return (
    <>
      <h2>Add Subcategory</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Row gutter={20}>
          <Col xs={24} sm={12}>
            <Form.Item label="Subcategory Name">
              <Input
                value={productSubcategoryName}
                onChange={(e) => {
                  handleChange('categoryName', e.target.value);;
                }}
                style={{ padding: '16px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Category Name">
              <Select
                style={{ height: 56.5 }}
                placeholder="Choose category"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                  </>
                )}
                options={[]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Subcategory Description">
              <TextArea
                rows={6}
                maxLength={60}
                onChange={(e) => setSubcategoryDescription(e.target.value)}
                value={subcategoryDescription}
              />
            </Form.Item>
          </Col>
        </Row>

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

  export default AddSubcategoryForm;
