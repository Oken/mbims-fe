import { Key, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Checkbox, Input, Table, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CustomModal, { CustomModalRef } from '../../../../../custom-modal';
import AddOutlet from './add-outlet';
import { StoreT, CustomOutletFormDataT, OutletT } from '../../../../../types/product-types';
import {
  // Queries
  useGetOutletsQuery,

  // Selectors
  selectAllOutlets,
} from '../../../../../store/feature-slice/products';

interface OutletDataT extends OutletT {
  // id: number;
  price?: string;
  key?: number | string;
}

type SelectOutletProps = {
  allOutlets: boolean;
  setAllOutlets: (value: boolean) => void;
  setOutletsIds: (value: number[] | null) => void;
  closeSelectOutlet: () => void;
  trackInventory: boolean;
  removeOutletModalPrice: boolean;
  setOutlets: (value: CustomOutletFormDataT[]) => void;
};

const { Item: FormItem } = Form;

const SelectOutlet = ({
  allOutlets,
  setAllOutlets,
  setOutletsIds,
  closeSelectOutlet,
  trackInventory,
  removeOutletModalPrice,
  setOutlets,
}: SelectOutletProps) => {
  const [form] = Form.useForm();
  // modal
  const modalRef = useRef<CustomModalRef>(null);

  const [outletData, setOutletData] = useState<any[]>([]); // Changed initial state to empty array
  const [allOutletSelect, setAllOutletSelect] = useState<number[]>([]);

  const [localOutletsIds, setLocalOutletsIds] = useState<number[]>([]);
  const [createdNewOutlet, setCreatedNewOutlet] = useState<boolean>(false);

  // Function to handle price input change
  const handlePriceChange = (value: string, idx: number) => {
    const newOutletData = outletData.map((outlet) => {
      if (outlet.id === idx) {
        return { ...outlet, price: value }; // Update price for selected outlet
      }
      return outlet;
    });
    setOutletData(newOutletData);
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
      render: (_: string, record: OutletDataT, index) => (
        <>
          <a>{record.outletName}</a>
          <FormItem
            name={['outlets', index, 'outletId']}
            noStyle
            hidden
            initialValue={record.id}
          >
            <Input
              type="text"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
          <FormItem
            name={['outlets', index, 'outletName']}
            noStyle
            hidden
            initialValue={record.outletName}
          >
            <Input
              type="text"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
        </>
      ),
      width: '550px',
    },
    {
      title: 'In Stock',
      dataIndex: 'inStock',
      render: (_: string, record: OutletDataT, index) => (
        <>
          <FormItem
            name={['outlets', index, 'inStock']}
            noStyle
          >
            <Input
              type="text"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
        </>
      ),
      key: 'inStock'
    },
    {
      title: 'Low Stock Alert',
      dataIndex: 'lowStockAlert',
      render: (_: string, record: OutletDataT, index) => (
        <>
          <FormItem
            name={['outlets', index, 'lowStockAlert']}
            noStyle
          >
            <Input
              type="number"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
        </>
      ),
      key: 'lowStockAlert'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_: string, record: OutletDataT, index) => (
        <>
          <FormItem
            name={['outlets', index, 'price']}
            noStyle
            initialValue={record.price}
          >
            <Input
              type="number"
              prefix="₦"
              onChange={(e) => handlePriceChange(e.target.value, record.id ?? 0)}
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
        </>
      ),
      key: 'price'
    }
  ];

  // Handling store select modal
  const handleAllStoreSelect = () => {
    const allOutletKeys = outletData.map((outlet) => outlet.id);
    setAllOutletSelect(allOutletKeys);
    console.log('John Ochada: ', allOutletSelect);
  }

  const handleAllStoreDeselect = () => {
    setAllOutletSelect([]);
    console.log('Deleted all select: ', allOutletSelect);
  }

  // Row selection logic
  const rowSelection = {
    // allStoreSelect,
    onChange: (selectedRowKeys: Key[]) => {
      // add selected store IDs to setOutletsIds state if allOutlets is false
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      if (!allOutlets) {
        setOutletsIds(selectedRowKeys as number[]);
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
          setOutletData(updatedOutlets);

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
    if (allOutlets) {
      setOutletsIds(outletData.map((outlet) => outlet.id).filter((id): id is number => id !== undefined));
    }
  }, [allOutlets, setOutletsIds, outletData]);

  const handleFinish = async (values: any) => {
    console.log('Got from store: ', values, localOutletsIds);
    // Handle form submission
    const selectValues = values.outlets.filter((value: any) => {
      if (localOutletsIds.includes(value.outletId)) {
        console.log('localOutletsIds: ', localOutletsIds, '\nvalue.storeId: ', value.storeId);
        return true;
      }

      // No match
      return false;
    });

    console.log('selectValues: ', selectValues);
    setOutlets(selectValues);
    closeSelectOutlet();
  };

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
      <h4>Select Outlet</h4>

      {/* <div style={{ padding: '30px 0' }}>
        <Checkbox
          checked={allOutlets}
          // onChange={(e) => {
          //   const checked = e.target.checked;
          //   if (checked) {
          //     setAllOutlets(checked);
          //     handleAllStoreSelect();
          //   } else {
          //     setAllOutlets(checked);
          //     handleAllStoreDeselect()
          //   }
          // }}
        />
        <span style={{ padding: '0 10px' }}>This item should be available for sale in all stores</span>
      </div> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: '30px' }}
      >
        <Table
          style={{ width: '600px !important', boxShadow: '0px 4px 4px 0px #173F7733', marginBottom: '35px' }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={
            trackInventory ?
              columns :
              columns.filter((column: any) => {
                if (column.dataIndex === 'inStock') return false;
                if (column.dataIndex === 'lowStockAlert') return false;
                if (column.dataIndex === 'price' && removeOutletModalPrice) return false;
                return true
              })
          }
          dataSource={outletData}
          pagination={false}
        />

        <Button type="text" icon={<PlusOutlined />} style={{ color: '#F45D01', margin: '10px 0' }} onClick={openModal}>
          Create new outlet
        </Button>

        <Button
          style={{
            margin: '15px auto',
            height: 40,
            width: 300,
            display: 'block',
          }}
          type="primary"
          htmlType="submit"
          // loading={isLoading}
        >
          Next
        </Button>
      </Form>
    </div>
  );
};

export default SelectOutlet;
