/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { FC, Key } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { ColumnsT, DataSourceT } from '../data-table-types';
import no_data_img from '../../../../public/assets/img/undraw_no_data.svg';
import './styles.scss';

interface DatatableProps {
  columns: ColumnsType<ColumnsT>;
  dataSource: DataSourceT;
}

const Datatable: FC<DatatableProps> = ({ columns, dataSource }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.id}
      locale={{
        emptyText: (
          <span>
            <img src={no_data_img} alt="No Data" />
            <p style={{ paddingTop: '20px' }}>No matching products found</p>
          </span>
        ),
      }}
    />
  );
};

export default Datatable;
