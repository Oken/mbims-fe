import { ReactNode, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Checkbox,
  Input,
  Table,
  Form,
  Row,
  Col,
  Select,
  Upload,
  GetProp,
  message,
} from 'antd';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined
} from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import type { ColumnsType } from 'antd/es/table';
import CustomModal, { CustomModalRef } from '../../../../../custom-modal';
import AddOutlet from '../outlets/add-outlet.tsx';
import { OutletT } from '../../../../../types/product-types';
import Algebra from '../../../../../style/icons/site-icons-component/algebra.tsx';
import { beforeUpload, uploadButton, } from '../../../../../upload/images';
import {
  // Queries
  useGetOutletsQuery,

  // Selectors
  selectAllOutlets,
} from '../../../../../store/feature-slice/products';

const { Item: FormItem } = Form;
const Option = Select.Option;

interface OutletDataT extends OutletT {
  id: number;
  price?: string;
  key?: number | string;
}

interface EditVariantPropT {
  inventoryTracking: boolean;
  variantType: string;
  closeEditVariantModal: () => void;
}

const EditVariant = ({
  inventoryTracking,
  variantType,
  closeEditVariantModal,
} : EditVariantPropT) => {
  // modal
  const modalRef = useRef<CustomModalRef>(null);
  const [mainOutlets, setMainOutlets] = useState<OutletT[]>([]);
  const [outletData, setOutletData] = useState<OutletDataT[]>([]);
  const [outlets, setOutlets] = useState<any[]>([]);
  const [customOutlet, setCustomOutlet] = useState<boolean>(false);
  const [allOutlets, setAllOutlets] = useState<boolean>(false);
  const [localOutletsIds, setLocalOutletsIds] = useState<number[]>([]);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [createdNewOutlet, setCreatedNewOutlet] = useState<boolean>(false);
  const [markUp, setMarkUp] = useState<string>('');
  const [margin, setMargin] = useState<number>(0);

  const [form] = Form.useForm();

  // Handle Image Upload
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newImageList }) => {
    console.log('Image List: ', newImageList);
    setImageList(newImageList);
  }

  const handlePriceChange = () => {
    const { costPrice, sellingPrice } = form.getFieldsValue(['costPrice', 'sellingPrice']);

    if (costPrice && sellingPrice) {
      const markup = ((sellingPrice - costPrice) / costPrice) * 100;
      const margin = ((sellingPrice - costPrice) / sellingPrice) * 100;

      form.setFieldsValue({
        markUp: markup.toFixed(2), // Limit to 2 decimal places
        margin: margin.toFixed(2),
      });
    }
  };

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    modalRef.current?.closeModal();
  };

  const columns: ColumnsType<OutletDataT> = [
    {
      title: 'Outlet',
      dataIndex: 'outlet',
      width: '500px',
      render: (_, outlet: OutletDataT, index) => (
        <div key={index}>
          <FormItem
            name={['variantOutlets', index, 'outletId']}
            noStyle
            hidden
            initialValue={outlet.id}
          >
            <Input
              type="text"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
          <FormItem
            name={['variantOutlets', index, 'outletName']}
            initialValue={outlet.outletName}
            noStyle
          >
            <input
              type="text"
              className='transformed-input'
              disabled
              style={{ padding: '16px' }}
            />
          </FormItem>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, outlet: OutletDataT, index) => (
        <div key={index}>
          <FormItem
            name={['variantOutlets', index, 'price']}
            noStyle
          >
            <Input type="number" prefix="₦" style={{ padding: '16px' }} />
          </FormItem>
        </div>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: OutletDataT[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (!allOutlets) {
        // setOutletsIds(selectedRowKeys as number[]);
        setLocalOutletsIds(selectedRowKeys as number[]);
      }
    },
    getCheckboxProps: (record: OutletDataT) => ({
      name: record.outletName,
    }),
  };

  const {
    error: outletError,
    isError: isOutletFetchingError,
    isSuccess: isOutletFetchingSuccess,
    isLoading: isOutletFetching,
  } = useGetOutletsQuery([]);
  const fetchedOutlets = useSelector(selectAllOutlets);

  // Effect to load stores
  useEffect(() => {
    const loadOutlets = async () => {
      try {
        if (isOutletFetchingSuccess) {
          const updatedOutlets = fetchedOutlets.map((outlet: any) => ({
            ...outlet,
            key: outlet.id,
          }));
          setMainOutlets(updatedOutlets);

          console.log('fetchedOutlets: ', fetchedOutlets, '\nupdatedOutlets', updatedOutlets);
        }

        if (isOutletFetchingError) {
          throw outletError;
        }
      } catch (err) {
        console.error('Error occurred within OutletStore', err);
      }
    };

    loadOutlets();
  }, [
    isOutletFetching,
    fetchedOutlets,
    createdNewOutlet,
  ]);

  useEffect(() => {
    const updatedOutlets = mainOutlets.map((outlet: OutletT) => ({
      ...outlet,
      key: outlet.id,
    }));
    setOutletData(updatedOutlets);
  }, [customOutlet, mainOutlets]);

  // Sellect Change Handler
  const handleSelectChange = (value: string) => {
    if (value === 'All Outlet') {
      setAllOutlets(true);
      setCustomOutlet(false);
      return;
    }

    if (value === 'Custom Outlet') {
      setAllOutlets(false);
      setCustomOutlet(true);
      return;
    }
  };

  const handleEditVariantForm = (changedValues: any, allValues: any) => {
    console.log('changedValues: ', JSON.stringify(changedValues));
    console.log('allValues.variantProducts: ', JSON.stringify(allValues));

    console.log('Got from Outlet: ', allValues, localOutletsIds);
    // Handle form submission
    if (allValues.variantOutlets) {
      const selectValues = allValues.variantOutlets.filter((variantOutlet: any) => {
        if (localOutletsIds.includes(variantOutlet.outletId)) {
          console.log('localOutletsIds: ', localOutletsIds, '\nvalue.outletId: ', variantOutlet.outletId);
          return true;
        }

        // No match
        return false;
      });

      console.log('selectValues: ', selectValues);
      setOutlets(selectValues);
    }
  }

  const onFinish = (values: any) => {
    console.log('values: ', values);
    // let concatenated: string[] = [];

    // values.variants.forEach((variant: any, index: any) => {
    //   console.log('Hello good', concatVariants);
    //   if (variant) {
    //     variant.values.forEach((value: string) => {
    //       console.log('variant.type: ', variant.type, '\nvariant values: ', value)

    //       // Capitalize the type and value
    //       const varianType = variant.type.charAt(0).toUpperCase() +
    //         variant.type.slice(1).toLowerCase();

    //       const variantValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    //       console.log('varianType: ', varianType, 'variantValue: ', variantValue);

    //       concatenated.push(`${varianType}/${variantValue}`);
    //     });
    //   }
    // });

    // const sortedConcatenated = concatenated.sort((a, b) => {
    //   if (a > b) return 1;
    //   else return -1;
    // })
    // console.log('concatenated: ', concatenated, sortedConcatenated);

    // setConcatVariants(sortedConcatenated);

    // Reset form data
    form.resetFields();

    // Exit modal
    closeEditVariantModal();
  }

  useEffect(() => {
    form.setFieldValue('variantType', variantType);
  }, [variantType]);

  return (
    <div>
      <CustomModal
        width={'800px'}
        ref={modalRef}
        content={<AddOutlet
          closeModal={closeModal}
          setCreatedNewOutlet={setCreatedNewOutlet}
        />}
      />
      <h4>Edit Variant</h4>

      <div>
        <Form
          form={form}
          onFinish={onFinish}
          className="_card"
          onValuesChange={handleEditVariantForm}
          style={{ border: 'none', borderRadius: '20px', boxShadow: '0px 4px 4px 0px #173F7733' }}
        >
          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '30px' }}>
            <p style={{ fontWeight: 600, display: 'inline' }}>Basic Information</p>
            <Row style={{ margin: '10px 0' }}>
              <Col span={24}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    Variant Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <FormItem name={`variantType`}>
                    <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                  </FormItem>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    SKU
                  </label>
                  <FormItem>
                    <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Barcode</label>
                  <FormItem>
                    <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                  </FormItem>
                </FormItem>
              </Col>
            </Row>
          </div>

          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '30px' }}>
            <p style={{ fontWeight: 600, display: 'inline' }}>Prices</p>
            <Row gutter={20} style={{ margin: '10px 0' }}>
              <Col xs={12} md={6}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    Cost Price <span style={{ color: 'red' }}>*</span>
                  </label>
                  <FormItem
                    name="costPrice"
                    rules={[{ required: true, message: 'Cost price is required' }]}
                    noStyle
                  >
                    <Input
                      type="text"
                      // value={costPrice}
                      onChange={handlePriceChange}
                      prefix="₦"
                      style={{ padding: '16px' }}
                    />
                  </FormItem>
                </FormItem>
              </Col>
              <Col xs={12} md={6}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    Selling Price <span style={{ color: 'red' }}>*</span>
                  </label>
                  <FormItem
                    name="sellingPrice"
                    rules={[{ required: true, message: 'Selling price is required' }]}
                    noStyle
                  >
                    <Input
                      type="text"
                      // value={sellingPrice}
                      onChange={handlePriceChange}
                      prefix="₦"
                      style={{ padding: '16px' }}
                    />
                  </FormItem>
                </FormItem>
              </Col>
              <Col xs={12} md={6}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Markup</label>
                  <FormItem name="markUp" noStyle>
                    <Input
                      type="text"
                      value={markUp}
                      // onChange={(e) => setMarkup(e.target.value)}
                      style={{ padding: '16px' }}
                      prefix={<Algebra />}
                    />
                  </FormItem>
                </FormItem>
              </Col>
              <Col xs={12} md={6}>
                <FormItem>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Margin</label>
                  <FormItem name="margin" noStyle>
                    <Input
                      type="text"
                      value={margin}
                      // onChange={(e) => setMargin(Number(e.target.value))}
                      style={{ padding: '16px' }}
                      prefix={<Algebra />}
                    />
                  </FormItem>
                </FormItem>
              </Col>
            </Row>
          </div>

          {/* Outlet */}
          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '30px' }}>
            {!allOutlets && customOutlet ? (
              <div>
                <p style={{ fontWeight: 600, display: 'inline' }}>Outlets</p>
                <div>
                  <div style={{ padding: '30px 0' }}>
                    <Checkbox /> <span style={{ padding: '0 10px' }}>This item should be available for sale in all outlets</span>
                  </div>
                  <Table
                    style={{ width: '750px', boxShadow: '0px 4px 4px 0px #173F7733', marginBottom: '35px' }}
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={outletData}
                    pagination={false}
                  />

                  <Button type="text" icon={<PlusOutlined />} style={{ color: '#F45D01', margin: '10px 0' }} onClick={openModal}>
                    Create new outlet
                  </Button>
                </div>
              </div>
            ) : (
              <FormItem>
                <label style={{ padding: '5px 0 10px 20px' }}>Outlet</label>
                <FormItem>
                  <Select placeholder="Select Outlet" style={{ height: 56.5 }} onChange={handleSelectChange}>
                    <Option defaulValue="All Outlet" style={{ padding: '16px' }}>
                      All Outlet
                    </Option>
                    <Option value="Custom Outlet" style={{ padding: '16px' }}>
                      Custom Outlet
                    </Option>
                  </Select>
                </FormItem>
              </FormItem>
            )}
          </div>

          {/* Variants */}
          <div className="variant-form-group" style={{ alignItems: 'flex-start', marginTop: '30px' }}>
            <div className="top-form" style={{ width: '100%', }}>
              <p>Variants</p>
            </div>
            {inventoryTracking ? (
              <div style={{ width: '100%', }}>
                {allOutlets ? (
                  <Row gutter={20} >
                    <Col span={8}>
                      <FormItem>
                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                          Outlet
                        </label>
                        <FormItem>
                          <Input type="text" style={{ padding: '16px', maxWidth: '100%', fontWeight: '500' }} value={'Tarauni Outlet'} disabled />
                        </FormItem>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem>
                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                          In Stock
                        </label>
                        <FormItem>
                          <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                        </FormItem>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem>
                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Low Stock Alert</label>
                        <FormItem>
                          <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                        </FormItem>
                      </FormItem>
                    </Col>
                  </Row>
                ) : (
                  <>
                    {outlets.map((outlet, index) => (
                      <div key={outlet.outletId}>
                        <Row
                          gutter={10}
                          style={{
                            margin: '10px 0',
                            width: '100%',
                            paddingRight: 5,
                          }}
                          justify={'space-between'}
                          align={'middle'}
                        >
                          <Col xs={12} md={8}>
                            <FormItem>
                              {index === 0 ? (
                                <label style={{ width: '100%' }}>Outlet</label>
                              ) : ('')}
                              <FormItem
                                name={['outlets', index, 'outletId']}
                                initialValue={outlet.outletId}
                                noStyle
                              >
                                {/* <Input
                                        type="text"
                                        placeholder="Outlet Name"
                                        style={{ padding: '16px' }}
                                        hidden
                                      /> */}
                              </FormItem>
                              <FormItem
                                name={['outlets', index, 'outletName']}
                                initialValue={outlet.outletName}
                              >
                                <Input
                                  type="text"
                                  className='transformed-input'
                                  readOnly
                                />
                              </FormItem>
                            </FormItem>
                          </Col>
                          <Col xs={12} md={8}>
                            <FormItem>
                              {index === 0 ? (
                                <label style={{ width: '100%' }}>
                                  In Stock
                                </label>
                              ) : ('')}
                              <FormItem
                                name={['outlets', index, 'inStock']}
                                initialValue={outlet.inStock}
                              >
                                <Input
                                  type="number"
                                  style={{ padding: '16px' }}
                                />
                              </FormItem>
                            </FormItem>
                          </Col>
                          <Col xs={12} md={8}>
                            <FormItem>
                              {index === 0 ? (
                                <label style={{ width: '100%' }}>Low Stock Alert</label>
                              ) : ('')}
                              <FormItem
                                name={['outlets', index, 'lowStock']}
                                initialValue={outlet.lowStock}
                              >
                                <Input
                                  type="number"
                                  style={{ padding: '16px' }}
                                />
                              </FormItem>
                            </FormItem>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div>
                <p style={{ fontWeight: 'normal', marginTop: '10px' }}>Inventory tracking is off</p>
              </div>
            )
            }
          </div>

          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '30px', marginBottom: '30px' }}>
            <p style={{ fontWeight: 600, padding: '10px 0' }}>Add Image</p>

            <FormItem
              name={`variantImages`}
              valuePropName='fileList'
              getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            >
              {/* <FormItem name={`productImages`}> */}
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                beforeUpload={beforeUpload}
                onChange={handleImageChange}
                style={{ width: '200px' }}
              >
                {uploadButton}
              </Upload>
            </FormItem>
          </div>

          <Button
            style={{
              margin: '15px auto',
              height: 40,
              width: 300,
              display: 'block',
            }}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditVariant;
