import { useState, MouseEvent, useRef } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';

const { Item: FormItem } = Form;

const VariantFormRow = ({ row, rowCount }) => {
  const [variantItems, setVariantItems] = useState(['Color', 'Size']);
  // variants
  const [newVariant, setNewVariant] = useState('');
  const [values, setValues] = useState<string[]>([]);

  // variant values
  const handleAddVariantValues = (value: string[]) => {
    setValues(value);
  };

  return (
    <div>
      <Row gutter={20}>
        <Col span={rowCount < 2 ? 12 : 11}>
          <FormItem>
            {/* Add label to the topmost row */}
            {row === 0 ? (
              <label style={{ padding: '5px 0 10px 20px' }}>Variants (e.g Size) <span style={{ color: 'red' }}>*</span></label>
            ) : ("")}
            <FormItem
              name={['variants', row, 'type']}
              // initialValue={newVariant}
              noStyle
            >
              <Select
                style={{ height: 56.5 }}
                placeholder="Select a variant"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Input placeholder="Add new variant" style={{ margin: '10px auto' }} onInput={(e) => {
                      const event = e.target as HTMLInputElement
                      setNewVariant(event.value)
                    }} />
                    {newVariant ? (
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        style={{ color: '#2D7DEE', margin: '10px 0' }}
                      >
                        Add "{newVariant}" as new variant
                      </Button>
                    ) : ("")}
                  </>
                )}
                options={variantItems.map((item) => ({ label: item, value: item }))}
              />
            </FormItem>
          </FormItem>
        </Col>
        <Col span={rowCount < 2 ? 12 : 11}>
          <FormItem>
            {/* Add label to the topmost row */}
            {row === 0 ? (
              <label style={{ padding: '5px 0 10px 20px' }}>Value (e.g Large) <span style={{ color: 'red' }}>*</span></label>
            ) : ("")}
            <FormItem
              name={['variants', row, 'values']}
              noStyle
            >
              <Select
                mode="tags"
                style={{ width: '100%', height: 56.5 }}
                placeholder="Input values"
                // onChange={handleAddVariantValues}
                // options={values.map((value) => ({ value: value, label: value }))}
              />
            </FormItem>
          </FormItem>
        </Col>
        {rowCount > 1 ? (
          <Col span={2} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <FormItem>
              <Link
                className="confirm-text"
                style={{ color: '#000' }}
                to="#"
              // onClick={() => showConfirmationAlert(product.id)}
              >
                <FeatherIcon icon="trash-2" className="feather-trash-2" />
              </Link>
            </FormItem>
          </Col>
        ) : ("")}
      </Row>
    </div>
  )
}

interface AddVariantProp {
  closeVariantModal: () => void,
  setConcatVariants: any,
  concatVariants: string[],
}

const AddVariant = ({
  closeVariantModal,
  setConcatVariants,
  concatVariants,
}: AddVariantProp ) => {
  // For adding new variant rows
  const [rowCount, setRowCount] = useState(1);
  const [rowCountArr, setRowCountArr] = useState([{ id: rowCount }]);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('values: ', values);
    let concatenated: string[] = [];

    values.variants.forEach((variant: any, index: any) => {
      console.log('Hello good', concatVariants);
      variant.values.forEach((value: string) => {
        console.log('variant.type: ', variant.type, '\nvariant values: ', value)
        concatenated.push(`${variant.type}/${value}`);
      });
    });

    const sortedConcatenated = concatenated.sort((a, b) => {
      if (a > b) return 1;
      else return -1;
    })
    console.log('concatenated: ', sortedConcatenated);

    setConcatVariants([...concatVariants, ...sortedConcatenated])

    // form.resetFields();

    // setRowCount(1);

    // closeVariantModal();
  }

  const handleVariantForm = (changedValues, allValues) => {
    console.log('changedValues: ', JSON.stringify(changedValues));
    console.log('allValues.variantProducts: ', JSON.stringify(allValues));
  }

  return (
    <>
      <h4>Select store</h4>
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={handleVariantForm}
      >
        <div>
          {[...Array(rowCount)].map((_, i) => (
            <VariantFormRow key={i} row={i} rowCount={rowCount} />
          ))}
        </div>
        <Row>
          <Button
            type="text"
            icon={<PlusOutlined />}
            style={{ color: '#F45D01', marginBottom: '10px' }}
            onClick={() => setRowCount(rowCount + 1)}
          >
            Add another variant
          </Button>
        </Row>
        <Button
          style={{
            margin: '15px auto',
            height: 56.5,
            width: 300,
            display: 'block',
          }}
          type="primary"
          htmlType="submit"
        >
          Next
        </Button>
      </Form>
    </>
  );
};

export default AddVariant;
