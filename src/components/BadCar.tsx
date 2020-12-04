/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Space, Popconfirm, message, Image } from 'antd';
import Axios from 'axios';
import serverPath from '../api/api';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;

const BadCar : React.FC = () => {

    const [data, setData] = useState([]);
    const [selectKeys, setSelectKeys] = useState([]);

    const removeFromBad = (id : any) => {
      Axios.post(serverPath.removeFromBad+id)
        .then(response => {
          if(response.data.updateSuccess){
            message.success('移出黑名单成功');
          }
        }).catch(error => {
          message.error('移出黑名单失败'+error);
        })
    }

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
        title: '来自',
        dataIndex: 'comes',
        // filters: [
        //   {
        //     text: 'London',
        //     value: 'London',
        //   },
        //   {
        //     text: 'New York',
        //     value: 'New York',
        //   },
        // ],
        // onFilter: (value : any, record : any) => record.address.indexOf(value) === 0,
      },
      {
        title: '图片',
        dataIndex: 'photo',
        render: (text : any, record : any, index : any) => (
          <Image src={text} width={50} />
        )
      },
      {
        title: '首次访问',
        dataIndex: 'isFirst',
      },
      {
          title: '操作',
          key: 'action',
          render: (text : any, record : any, index : any) => (
            <Space size="middle">
              <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => removeFromBad(text.id)}>
                <a>移出黑名单</a>
              </Popconfirm>
            </Space>
          ),
      },
    ];

    useEffect(() => {
      Axios.get(serverPath.getBadList)
        .then((response) => {
          // console.log(response.data);
          setData(response.data.badList);
        })
        .catch((error) => {
          console.log('获取车辆列表失败'+error);
        })
    },[data]);

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
        url: serverPath.removeBads,
        data: selectKeys,
        withCredentials: true,
      }).then(response => {
        if(response.data.deleteSuccess){
          message.success('移出成功!');
        }
      }).catch(error => {
        message.error('移出失败'+error);
      })
    }

    // 表格标题
    const renderTitle = () => {
      return <div className='bad-table-title' style={{color: "#4ca1f0",textAlign: "center",fontSize: "large"}}>
        黑名单
      </div>
    }

    // 表格尾部
    const renderFooter = () => {
      return <div className='bad-table-footer'>
        <Button type="primary" onClick={handleDelete} disabled={!hasSelected}>
            批量移出
        </Button>
        <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选择 ${selectKeys.length} 条` : ''}
        </span>
      </div>
    }

    return (
        <Layout>
            <Content>
                <div>
                    <Table 
                        // @ts-ignore
                        rowSelection={rowSelection}
                        dataSource={data}
                        columns={columns}
                        showSorterTooltip={false}
                        rowKey="car_key"
                        title={renderTitle}
                        footer={renderFooter}
                    />
                </div>
            </Content>
        </Layout>
    )
}

export default BadCar;