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
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TaxesT } from '../../../../types/product-types';
import { useAddNewTaxMutation } from '../../../../store/feature-slice/products';


type AddTaxT = Omit<TaxesT, 'id'>;

interface AddTaxProps {
  closeTaxModal: () => void;
}

const AddTaxForm = ({ closeTaxModal }: AddTaxProps) => {
  const [form] = Form.useForm();
  const [tax, setTax] = useState<AddTaxT>({
    name: '',
    rate: 0,
  });

  const handleChange = (field: keyof AddTaxT, value: any) => {
    setTax((prev) => ({ ...prev, [field]: value }));
  };

  const [addNewTax, { isLoading, isSuccess }] = useAddNewTaxMutation();

  const handleFinish = async () => {
    // Handle form submission
    try {
      console.log('isLoading: ', isLoading);
      // setLoading(isLoading);
      const resTax = await addNewTax(tax).unwrap();
      console.log('resTax: ', resTax);

      if (isSuccess) {
        message.success('Tax added successfully');
        form.resetFields(); // Reset form after successful submission
        // closeCategoryModal();
      }
    } catch (err) {
      message.error('Failed to add Tax');
      console.log('err: ', err);
    }
  };

  return (
    <>
      <h2>Create a tax rate</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Row gutter={40}>
          <Col span={24}>
            <Form.Item label="Tax Name">
              <Input
                value={tax.name}
                onChange={(e) => handleChange('name', e.target.value)}
                style={{ padding: '16px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={40} style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Form.Item label="Rate">
              <Input
                value={tax.rate ? tax.rate : ''}
                onChange={(e) => handleChange('rate', e.target.value)}
                style={{ padding: '16px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={40} style={{ justifyContent: 'center' }}>
          <Col span={24}>
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

export default AddTaxForm;
