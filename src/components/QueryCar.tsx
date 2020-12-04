import React, { useState } from 'react';
import { Button, Layout, Popconfirm, Space, Table, message, Input } from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';
import serverPath from '../api/api';

const { Content } = Layout;
const { Search } = Input;

const QueryCar = () => {

    const [data, setData] = useState([]);
    const [selectKeys, setSelectKeys] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
          title: '车牌编号',
          dataIndex: 'number',
        },
        {
          title: '进入时间',
          dataIndex: 'inTime',
        },
        {
          title: '离开时间',
          dataIndex: 'outTime',
        },
        {
          title: '停驻时间（分钟）',
          dataIndex: 'stayTime',
        },
        {
          title: '应缴费',
          dataIndex: 'money',
        },
        {
            title: '操作',
            key: 'action',
            render: (text : any, record : any, index :any ) => (
              <Space size="middle">
                <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => deleteRecord(text.id)}>
                  <a>删除</a>
                </Popconfirm>
              </Space>
            ),
        },
    ];

    const inputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    // 获取查询车辆出入记录
    const onSearch = (car_number : any) => {
        Axios.post(serverPath.getRecordByCar+car_number)
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                message.error('获取该汽车记录失败');
            })
    }

    // 删除单条记录
    const deleteRecord = (id : any) => {
        Axios.post(serverPath.deleteRecord+id)
            .then(response => {
                if(response.data.deleteSuccess){
                    message.success('删除成功');
            }
            }).catch((error) => {
                message.error('删除失败!'+error);
            })
    }

    const onSelectChange = (selectRowKeys: React.SetStateAction<never[]>) => {
        setSelectKeys(selectRowKeys);
    }

    const rowSelection = {
        selectKeys,
        onChange: onSelectChange,
    }
    
    const hasSelected = selectKeys.length > 0;

    const handleDelete = () => {
        Axios({
            method: 'POST',
            url: serverPath.deleteSomeRecords,
            data: selectKeys,
            withCredentials: true,
        }).then(response => {
            if(response.data.deleteSuccess){
                message.success('删除成功!');
            }
        }).catch(error => {
            message.error('删除失败'+error);
        })
    }

    // 表格尾部
    const renderFooter = () => {
        return <div className='record-table-footer'>
          <Button type="primary" onClick={handleDelete} disabled={!hasSelected}>
              批量删除
          </Button>
          <span style={{ marginLeft: 8 }}>
              {hasSelected ? `选择 ${selectKeys.length} 条记录` : ''}
          </span>
        </div>
    }

    return (
        <Layout>
            <Content>
                <Search
                    placeholder="请输入要查询的车牌号"
                    enterButton="Search"
                    size="large"
                    onSearch={() => onSearch(inputValue)}
                    onChange={inputChange}
                />
                <Table 
                    // @ts-ignore
                    rowSelection={rowSelection}
                    dataSource={data}
                    columns={columns}
                    showSorterTooltip={false}
                    rowKey="record_key"
                    // title={renderTitle}
                    footer={renderFooter}
                />
            </Content>
        </Layout>
    )
}

export default QueryCar;