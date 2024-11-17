/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { FC, Key } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { ColumnsT, DataSourceT } from './data-table-types';

interface DatatableProps {
  columns: ColumnsType<ColumnsT>;
  dataSource: DataSourceT;
  props?: any;
}

const Datatable: FC<DatatableProps> = ({ props, columns, dataSource }) => {
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
      key={props}
      {...props}
      className="table datanew dataTable no-footer"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.id}
    />
  );
};

export default Datatable;
