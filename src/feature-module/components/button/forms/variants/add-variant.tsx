import { useState, MouseEvent, useRef, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select, RefSelectProps, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import TagRender from '../../utils/tag-render';
import CustomTagRenderProvider
  from '../../utils/context/tagrender-context.tsx';
import { useSelector } from 'react-redux';
import {
  // Queries
  useGetVariantAttributesQuery,

  // Selectors
  selectAllVariantAttributes,
} from '../../../../../store/feature-slice/products';
import { VariantAttributeT } from '../../../../../types/product-types';
import CustomModal, { CustomModalRef } from '../../../../../custom-modal';
import AddVariantAttributeForm from './add-variant-attributes';

const { Item: FormItem } = Form;

interface VariantRow {
  id: number;
}

interface VariantFormRowPropT {
  row: number;
  rowCount: number;
  variantRow: VariantRow;
  addVariantRows: VariantRow[];
  setAddVariantRows: (value: VariantRow[]) => void;
  variantAttributes: VariantAttributeT[];
}

// Child component
const VariantFormRow = ({
  row,
  rowCount,
  variantRow,
  addVariantRows,
  setAddVariantRows,
  variantAttributes,
}: VariantFormRowPropT) => {
  // Modal ref
  const addVariantAttributeModalRef = useRef<CustomModalRef>(null);

  const selectRef = useRef<RefSelectProps>(null);

  const [variantItems, setVariantItems] = useState<VariantAttributeT[]>([]);
  const [
    filteredVariantItems,
    setFilteredVariantItems
  ] = useState<VariantAttributeT[]>([]);
  // variants
  const [variantTypeSearchTerm, setVariantTypeSearchTerm] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [isAttributeTypeSelectOpen, setIsAttributeTypeSelectOpen] = useState(false);

  useEffect(() => {
    // Don't set an empty array
    if (variantAttributes.length > 0) {
      setVariantItems(variantAttributes);
    }
  }, [variantAttributes])

  const deleteAddVariantRow = (variantRowId: number) => {
    console.log('variantRowId: ', variantRowId, 'addVariantRows: ', addVariantRows);

    const afterDeletion = addVariantRows.filter((variantRow: VariantRow, index: number) => {
      return variantRow.id !== variantRowId;
    });

    console.log('afterDeletion: ', afterDeletion);

    setAddVariantRows(afterDeletion);

    console.log('addVariantRows: ', addVariantRows);
  }

  const handleVariantAttributeSearch = (e: any) => {
    const event = e.target as HTMLInputElement
    const val = event.value;
    setVariantTypeSearchTerm(event.value);

    if (val == '') return;

    const filtered = variantItems.filter(
      option => option.name.toLowerCase().startsWith(val.toLowerCase())
    )

    const filteredVariantList = filtered.map((item: VariantAttributeT) => ({
      value: item.name,
      label: item.name,
    }));

    setFilteredVariantItems(filteredVariantList);
  }

  const handleBlur = () => {
    if (selectRef.current) {
      selectRef.current.blur();
      selectRef.current.focus();
    }
  }

  const addNewAttribute = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAttributeTypeSelectOpen(false);
    openAddVariantAttributeModal();
    handleBlur();
  };

  const openAddVariantAttributeModal = () => {
    addVariantAttributeModalRef.current?.openModal();
  };

  const closeAddVariantAttributeModal = () => {
    addVariantAttributeModalRef.current?.closeModal();
  };

  return (
    <>
      <CustomModal
        ref={addVariantAttributeModalRef}
        content={<AddVariantAttributeForm
          closeAddVariantAttributeModal={closeAddVariantAttributeModal}
          attributeName={variantTypeSearchTerm}
        />}
        width={'500px'}
      />
      <div style={{ marginBottom: 10 }}>
        <Row gutter={20}>
          <Col span={addVariantRows.length < 2 ? 12 : 11}>
            <FormItem>
              {/* Add label to the topmost row */}
              {row === 0 ? (
                <label style={{ padding: '5px 0 10px 20px' }}>Variants (e.g Size) <span style={{ color: 'red' }}>*</span></label>
              ) : ("")}
              <FormItem
                name={['variants', variantRow.id, 'type']}
                noStyle
                rules={[{
                  required: true,
                  message: 'Variants is required'
                }]}
              >
                <Select
                  ref={selectRef}
                  style={{ height: 56.5 }}
                  placeholder="Select a variant"
                  transitionName=""
                  dropdownStyle={{ animation: 'none !important' }}
                  optionFilterProp="label"
                  onSelect={handleBlur}
                  options={filteredVariantItems}
                  open={isAttributeTypeSelectOpen}
                  onDropdownVisibleChange={(open) => setIsAttributeTypeSelectOpen(open)}
                  dropdownRender={(menu) => (
                    <div style={{ padding: '5px' }}>
                      <Input
                        type="text"
                        // value={barcode}
                        placeholder="Search"
                        style={{ padding: '10px' }}
                        value={variantTypeSearchTerm}
                        onInput={handleVariantAttributeSearch}
                      />
                      {menu}
                      {variantTypeSearchTerm ? (
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          style={{ color: '#2D7DEE', margin: '10px 0' }}
                          onClick={addNewAttribute}
                        >
                          Add "{variantTypeSearchTerm}" as new Variant
                        </Button>
                      ) : ("")}
                    </div>
                  )}
                  notFoundContent={
                    variantTypeSearchTerm ? (
                      <div style={{ textAlign: 'center', margin: '5px' }} >
                        <div>No results match "{variantTypeSearchTerm}"</div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', margin: '5px' }} >
                        <div>No data</div>
                      </div>
                    )
                  }
                />
                {/* <Select
                  style={{ height: 56.5 }}
                  placeholder="Select a variant"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Input
                        placeholder="Add new variant"
                        style={{
                          margin: '10px auto',
                          padding: '10px',
                        }}
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement
                          setVariantTypeSearchTerm(event.value)
                        }}
                      />
                      {variantTypeSearchTerm ? (
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          style={{ color: '#2D7DEE', margin: '10px 0' }}
                        >
                          Add "{variantTypeSearchTerm}" as new variant
                        </Button>
                      ) : ("")}
                    </>
                  )}
                  options={variantItems.map((item) => ({
                    label: item.name,
                    value: item.name
                  }))}
                /> */}
              </FormItem>
            </FormItem>
          </Col>
          <Col span={addVariantRows.length < 2 ? 12 : 11}>
            <FormItem>
              {/* Add label to the topmost row */}
              {row === 0 ? (
                <label style={{ padding: '5px 0 10px 20px' }}>Value (e.g Large) <span style={{ color: 'red' }}>*</span></label>
              ) : ("")}
              <CustomTagRenderProvider plainDelete={true}>
                <FormItem
                  name={['variants', variantRow.id, 'values']}
                  noStyle
                  rules={[{
                    required: true,
                    message: 'Value is required',
                  }]}
                >
                  <Select
                    mode="tags"
                    style={{ width: '100%', height: 56.5 }}
                    tagRender={TagRender}
                    placeholder="Input values"
                  />
                </FormItem>
              </CustomTagRenderProvider>
            </FormItem>
          </Col>
          {(addVariantRows.length > 1) ? (
            <Col span={2} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormItem>
                <Button
                  style={{
                    color: '#000',
                    border: 'none',
                    padding: 0,
                  }}
                  onClick={() => deleteAddVariantRow(variantRow.id)}
                >
                  <FeatherIcon icon="trash-2" className="feather-trash-2" />
                </Button>
              </FormItem>
            </Col>
          ) : ("")}
        </Row>
      </div>
    </>
  )
}

interface AddVariantProp {
  closeVariantModal: () => void,
  setConcatVariants: any,
  concatVariants: string[],
}

type ChangedValues<T = any> = Partial<T>;
type AllValues<T = any> = T;

type OnFinish<T = any> = (values: T) => void;

type OnValuesChange<T = any> = (
  changedValues: Partial<T>,
  allValues: T,
) => void;

interface Variant {
  type: string;
  values: string[];
}

interface FormData {
  name: string;
  variants: Variant[];
}

// Parent component
const AddVariant = ({
  closeVariantModal,
  setConcatVariants,
  concatVariants,
}: AddVariantProp ) => {
  // For adding new variant rows
  const [rowCount, setRowCount] = useState<number>(1);
  const [addVariantRows, setAddVariantRows] = useState<VariantRow[]>([{ id: rowCount }]);
  const [variantAttributes, setVariantAttributes] = useState<VariantAttributeT[]>([]);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   console.log('addVariantRows before: ', addVariantRows, 'rowCount: ', rowCount);
  //   // setAddVariantRows([...addVariantRows, { id: rowCount }]);
  //   console.log('addVariantRows after: ', addVariantRows, 'rowCount: ', rowCount);
  // }, [rowCount, setRowCount]);

  const {
    error: variantAttributeError,
    isError: isVariantAttributeFetchingError,
    isSuccess: isVariantAttributeFetchingSuccess,
    isLoading: isVariantAttributeFetching,
  } = useGetVariantAttributesQuery([]);
  const fetchedVariantAttributes = useSelector(selectAllVariantAttributes);

  // Effect to load stores
  useEffect(() => {
    const loadVariantAttributes = async () => {
      try {
        if (isVariantAttributeFetchingSuccess) {
          console.log('fetchedVariantAttributes: ', fetchedVariantAttributes);
          setVariantAttributes(fetchedVariantAttributes);
        }

        if (isVariantAttributeFetchingError) {
          throw variantAttributeError;
        }
      } catch (err) {
        console.error('Error occurred within SelectStore', err);
      }
    };

    loadVariantAttributes();
  }, [isVariantAttributeFetching]);

  const handleSubmit = (values: AllValues<FormData>) => {
    console.log('values: ', values);
    let concatenated: string[] = [];

    values.variants.forEach((variant: any, index: any) => {
      console.log('Hello good', concatVariants);
      if (variant) {
        variant.values.forEach((value: string) => {
          console.log('variant.type: ', variant.type, '\nvariant values: ', value)

          // Capitalize the type and value
          const varianType = variant.type.charAt(0).toUpperCase() +
            variant.type.slice(1).toLowerCase();

          const variantValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

          console.log('varianType: ', varianType, 'variantValue: ', variantValue);

          concatenated.push(`${varianType}/${variantValue}`);
        });
      }
    });

    const sortedConcatenated = concatenated.sort((a, b) => {
      if (a > b) return 1;
      else return -1;
    })
    console.log('concatenated: ', concatenated, sortedConcatenated);

    setConcatVariants(sortedConcatenated)

    // Reset form data
    form.resetFields();
    setRowCount(1);
    setAddVariantRows([{id: 1}]);

    // Exit modal
    closeVariantModal();
  }

  const handleVariantForm: OnValuesChange<FormData> = (changedValues, allValues) => {
    console.log('changedValues: ', JSON.stringify(changedValues));
    console.log('allValues.variantProducts: ', JSON.stringify(allValues));
  }

  return (
    <>
      <h4>Add Variants</h4>
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={handleVariantForm}
        // initialValues={{
        //   variants: [{ type: '', values: [] }]
        // }}
      >
        <div>
          {addVariantRows.map((variantRow, i) => (
            <VariantFormRow
              key={variantRow.id}
              row={i}
              rowCount={rowCount}
              variantRow={variantRow}
              addVariantRows={addVariantRows}
              setAddVariantRows={setAddVariantRows}
              variantAttributes={variantAttributes}
            />
          ))}
        </div>
        <Row>
          <Button
            type="text"
            icon={<PlusOutlined />}
            style={{ color: '#F45D01', marginBottom: '10px' }}
            onClick={() => {
              setRowCount(rowCount + 1)
              setAddVariantRows([...addVariantRows, { id: rowCount + 1 }]);
            }}
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
