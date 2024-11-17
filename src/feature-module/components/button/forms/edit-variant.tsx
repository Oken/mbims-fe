import { ReactNode, useRef, useState, useEffect } from 'react';
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
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { ColumnsType } from 'antd/es/table';
import CustomModal, { CustomModalRef } from '../../../../custom-modal';
import AddStore from './add-outlet.tsx';
import { StoreT } from '../../../../types/product-types';
import Algebra from '../../../../style/icons/site-icons-component/algebra.tsx';

// import '../../../inventory/add-products/variant-product/styles.scss'

const { Item: FormItem } = Form;
const Option = Select.Option;

// Types
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// Upload the image
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }

  // If this returns `true`, uploading becomes automatic
  // return isJpgOrPng && isLt2M;

  // Prevent automatic uploading (POST request if `action` attribute is used)
  return false;
};

const uploadButton = (
  <button
    style={{ border: 0, background: 'none', width: '100%', height: '100%', position: 'relative' }}
    type="button"
  >
    {/* <FileImageOutlined /> */}
    {/* {loading ? <LoadingOutlined /> : <FileImageOutlined />} */}

    <span style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, 0)' }}>
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.33333 48C3.86667 48 2.61156 47.4782 1.568 46.4347C0.524445 45.3911 0.00177778 44.1351 0 42.6667V5.33333C0 3.86667 0.522667 2.61156 1.568 1.568C2.61333 0.524445 3.86844 0.00177778 5.33333 0H42.6667C44.1333 0 45.3893 0.522667 46.4347 1.568C47.48 2.61333 48.0018 3.86844 48 5.33333V42.6667C48 44.1333 47.4782 45.3893 46.4347 46.4347C45.3911 47.48 44.1351 48.0018 42.6667 48H5.33333ZM5.33333 42.6667H42.6667V5.33333H5.33333V42.6667ZM8 37.3333H40L30 24L22 34.6667L16 26.6667L8 37.3333Z"
          fill="#0D1821"
          fill-opacity="0.3"
        />
      </svg>
    </span>

    <p
      style={{
        position: 'absolute',
        bottom: '0',
        left: 0,
        right: 0,
        padding: '5px',
        fontSize: '12px',
        background: '#173F77',
        color: '#D5E5FC',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
      }}
    >
      Choose Image
    </p>
  </button>
);

interface StoreDataT extends StoreT {
  id: number;
  price?: string;
  key?: number | string;
}

interface EditVariantPropT {
  inventoryTracking: boolean;
  storeData: StoreT[];
  closeEditVariantModal: () => void;
}

const EditVariant = ({
  inventoryTracking,
  storeData,
  closeEditVariantModal,
} : EditVariantPropT) => {
  // modal
  const modalRef = useRef<CustomModalRef>(null);
  const [storeDataData, setStoreDataData] = useState<StoreDataT[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [customStore, setCustomStore] = useState<boolean>(false);
  const [allStores, setAllStores] = useState<boolean>(false);
  const [localStoresIds, setLocalStoresIds] = useState<number[]>([]);
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // Handle Image Upload
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newImageList }) => {
    console.log('Image List: ', newImageList);
    setImageList(newImageList);
  }

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    modalRef.current?.closeModal();
  };

  const columns: ColumnsType<StoreDataT> = [
    {
      title: 'Store',
      dataIndex: 'store',
      width: '500px',
      render: (_, store: StoreDataT, index) => (
        <div key={index}>
          <FormItem
            name={['variantStores', index, 'storeId']}
            noStyle
            hidden
            initialValue={store.id}
          >
            <Input
              type="text"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
          <FormItem
            name={['variantStores', index, 'storeName']}
            initialValue={store.storeName}
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
      render: (_, store: StoreDataT, index) => (
        <div key={index}>
          <FormItem
            name={['variantStores', index, 'price']}
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
    onChange: (selectedRowKeys: React.Key[], selectedRows: StoreDataT[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (!allStores) {
        // setStoresIds(selectedRowKeys as number[]);
        setLocalStoresIds(selectedRowKeys as number[]);
      }
    },
    getCheckboxProps: (record: StoreDataT) => ({
      name: record.storeName,
    }),
  };

  useEffect(() => {
    const updatedStores = storeData.map((store: StoreDataT) => ({
      ...store,
      key: store.id,
    }));
    setStoreDataData(updatedStores);
  }, [customStore, storeData]);

  // Sellect Change Handler
  const handleSelectChange = (value: string) => {
    if (value === 'All Store') {
      setAllStores(true);
      setCustomStore(false);
      return;
    }

    if (value === 'Custom Store') {
      setAllStores(false);
      setCustomStore(true);
      return;
    }
  };

  const handleEditVariantForm = (changedValues: any, allValues: any) => {
    console.log('changedValues: ', JSON.stringify(changedValues));
    console.log('allValues.variantProducts: ', JSON.stringify(allValues));

    console.log('Got from store: ', allValues, localStoresIds);
    // Handle form submission
    if (allValues.variantStores) {
      const selectValues = allValues.variantStores.filter((variantStore: any) => {
        if (localStoresIds.includes(variantStore.storeId)) {
          console.log('localStoresIds: ', localStoresIds, '\nvalue.storeId: ', variantStore.storeId);
          return true;
        }

        // No match
        return false;
      });

      console.log('selectValues: ', selectValues);
      setStores(selectValues);
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

  return (
    <div>
      <CustomModal
        width={'800px'}
        ref={modalRef}
        content={<AddStore closeModal={closeModal} />}
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
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    Variant Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Input type="text" prefix="₦" style={{ padding: '16px', maxWidth: '100%' }} />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    SKU <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Input type="text" prefix="₦" style={{ padding: '16px', maxWidth: '100%' }} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Barcode</label>
                  <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                </FormItem>
              </Col>
            </Row>
          </div>

          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '30px' }}>
            <p style={{ fontWeight: 600, display: 'inline' }}>Prices</p>
            <Row gutter={20} style={{ margin: '10px 0' }}>
              <Col span={6}>
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    Cost Price <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Input type="text" prefix="₦" style={{ padding: '16px', maxWidth: '210px' }} />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                    Selling Price <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Input type="text" prefix="₦" style={{ padding: '16px', maxWidth: '210px' }} />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Markup</label>
                  <Input
                    type="text"
                    style={{ padding: '16px', maxWidth: '210px' }}
                    prefix={<Algebra />}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem name={`field`}>
                  <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Margin</label>
                  <Input
                    type="text"
                    style={{ padding: '16px', maxWidth: '210px' }}
                    prefix={<Algebra />}
                  />
                </FormItem>
              </Col>
            </Row>
          </div>

          {/* Store */}
          <div style={{ border: '1px dashed black', padding: '10px', marginTop: '30px' }}>
            {!allStores && customStore ? (
              <div>
                <p style={{ fontWeight: 600, display: 'inline' }}>Stores</p>
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
                    dataSource={storeDataData}
                    pagination={false}
                  />

                  <Button type="text" icon={<PlusOutlined />} style={{ color: '#F45D01', margin: '10px 0' }} onClick={openModal}>
                    Create new store
                  </Button>
                </div>
              </div>
            ) : (
              <FormItem name={`field`}>
                <label style={{ padding: '5px 0 10px 20px' }}>Store</label>
                <Select placeholder="Select Outlet" style={{ height: 56.5 }} onChange={handleSelectChange}>
                  <Option defaulValue="All Store" style={{ padding: '16px' }}>
                    All Outlet
                  </Option>
                  <Option value="Custom Store" style={{ padding: '16px' }}>
                    Custom Outlet
                  </Option>
                </Select>
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
                {allStores ? (
                  <Row gutter={20} >
                    <Col span={8}>
                      <FormItem name={`field`}>
                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                          Store
                        </label>
                        <Input type="text" style={{ padding: '16px', maxWidth: '100%', fontWeight: '500' }} value={'Tarauni Store'} disabled />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem name={`field`}>
                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>
                          In Stock
                        </label>
                        <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem name={`field`}>
                        <label style={{ padding: '5px 0 10px 20px', width: '100%' }}>Low Stock Alert</label>
                        <Input type="text" style={{ padding: '16px', maxWidth: '100%' }} />
                      </FormItem>
                    </Col>
                  </Row>
                ) : (
                  <>
                    {stores.map((store, index) => (
                      <div key={store.storeId}>
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
                                <label style={{ width: '100%' }}>Store</label>
                              ) : ('')}
                              <FormItem
                                name={['stores', index, 'storeId']}
                                initialValue={store.storeId}
                                noStyle
                              >
                                {/* <Input
                                        type="text"
                                        placeholder="Store Name"
                                        style={{ padding: '16px' }}
                                        hidden
                                      /> */}
                              </FormItem>
                              <FormItem
                                name={['stores', index, 'storeName']}
                                initialValue={store.storeName}
                              >
                                <input
                                  type="text"
                                  className='transformed-input'
                                  disabled
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
                                name={['stores', index, 'inStock']}
                                initialValue={store.inStock}
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
                                name={['stores', index, 'lowStock']}
                                initialValue={store.lowStock}
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

            <FormItem name={`variantImage`} valuePropName='fileList'>
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                beforeUpload={beforeUpload}
                onChange={handleImageChange}
                style={{ width: '400px' }}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditVariant;
