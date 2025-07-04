import React, { useState } from 'react';
import { Divider, Radio, Table, Button } from 'antd';
import type { TableColumnsType } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addSelected, removeSelected } from '../redux/selectSlice';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const originalData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park',
  },
];

const CustomTable: React.FC = () => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const selecteds = useSelector((state: any) => state.arr);

  const rowSelection = {
    type: selectionType,
    onChange: (_selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      dispatch(addSelected(selectedRows));
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  if (currentPage === 2) {
    columns.push({
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: DataType) => (
        <Button danger onClick={() => dispatch(removeSelected(String(record.key)))}>
          Delete
        </Button>
      ),
    });
  }

  const displayedData = currentPage === 1 ? originalData : selecteds;

  return (
    <div className='w-[90%]'>
      <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">Radio</Radio>
      </Radio.Group>
      <Divider />
      <Table<DataType>
        rowSelection={currentPage === 1 ? rowSelection : undefined}
        columns={columns}
        dataSource={displayedData}
        pagination={{
          pageSize: 4,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          total: 8,
        }}
      />
    </div>
  );
};

export default CustomTable;
