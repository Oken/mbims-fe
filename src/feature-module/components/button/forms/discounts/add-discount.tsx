/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Switch,
  Space,
  message,
  Row,
  Col,
  Select
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { DiscountT } from '../../../../../types/product-types';
import { useAddNewProductDiscountMutation } from '../../../../../store/feature-slice/products';


type AddDiscountT = Omit<DiscountT, 'id'>;

interface AddDiscountProps {
  closeDiscountModal: () => void;
  // setProductCategoryId: () => void;
}

const Option = Select.Option;

const AddDiscountForm = ({ closeDiscountModal, /*setProductCategoryId*/ }: AddDiscountProps) => {
  const [form] = Form.useForm();
  const [allowedToApply, setAllowedToApply] = useState<boolean>(true)
  const [discount, setDiscount] = useState<AddDiscountT>({
    discountName: '',
    discountType: '',
    discountValue: 0,
  });

  type DiscountType = {
    id: number,
    value: string,
  }

  const discountTypes: DiscountType[] = [
    { id: 1, value: 'PERCENTAGE' },
    { id: 2, value: 'FIXED' },
  ]

  const handleChange = (field: keyof AddDiscountT, value: any) => {
    setDiscount((prev) => ({ ...prev, [field]: value }));
  };

  const [addNewDiscount, { isLoading, isSuccess }] = useAddNewProductDiscountMutation();

  const handleFinish = async () => {
    // Handle form submission
    try {
      console.log('discount oh: ', discount);
      // setLoading(isLoading);
      const resDiscount = await addNewDiscount(discount).unwrap();
      console.log('resDiscount: ', resDiscount);

      if (isSuccess) {
        message.success('Discount added successfully');
        form.resetFields(); // Reset form after successful submission
        // closeCategoryModal();
      }
    } catch (err) {
      message.error('Failed to add discount');
      console.log('err: ', err);
    }
  };

  return (
    <>
      <h2>Create a discount</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Row gutter={40}>
          <Col span={24}>
            <Form.Item label="Discount Name">
              <Input
                value={discount.discountName}
                onChange={(e) => handleChange('discountName', e.target.value) }
                style={{ padding: '15px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col xs={24} md={12}>
            <Form.Item label="Discount Value">
              <Select
                placeholder="Select discount"
                style={{ height: 56.5 }}
                value={discount.discountType}
                onChange={(value) => handleChange('discountType', value)}
              >
                {discountTypes.map((discountType: DiscountType) => (
                  <Option key={discountType.id} value={discountType.value} style={{ padding: '10px' }}>
                    {discountType.value}
                  </Option>
                ))}
                {/* <Option value={'PERCENTAGE'} style={{ padding: '10px' }}>PERCENTAGE</Option>
                <Option value={'FIXED'} style={{ padding: '10px' }}>FIXED</Option> */}
              </Select>
            </Form.Item >
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Discount Value">
              <Input
                value={discount.discountValue}
                onChange={(e) => handleChange('discountValue', e.target.value)}
                style={{ padding: '15px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={40} style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Space direction="horizontal" style={{ margin: '10px 0' }}>
              <Switch
                checked={allowedToApply}
                // onChange={() => setTrackInventory(!trackInventory)}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
              <span>Only employees with appropriate access are allowed to apply this discount</span>
            </Space>
          </Col>
        </Row>

        <Row gutter={40} style={{ justifyContent: 'center' }}>
          <Col span={12}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ width: '100%', padding: '25px' }}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddDiscountForm;
