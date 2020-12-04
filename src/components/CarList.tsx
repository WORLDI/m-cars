/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Space, Image, Popconfirm, message } from 'antd';
import Axios from 'axios';
import serverPath from '../api/api';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../style/CarList.css';

const { Content } = Layout;

const CarList : React.FC = () => {

    const [data, setData] = useState([]);
    const [selectKeys, setSelectKeys] = useState([]);

    const deleteCar = (id : any) => {
      Axios.post(serverPath.deleteCar+id)
        .then(response => {
          if(response.data.deleteSuccess){
            message.success('删除成功');
          }
        }).catch((error) => {
          message.error('删除失败!'+error);
        })
    }

    const addToBad = (id : any) => {
      Axios.post(serverPath.addToBad+id)
        .then(response => {
          console.log(response);
          if(response.data.updateSuccess){
            message.success('加入黑名单成功');
          }
        }).catch(error => {
          message.error('加入黑名单失败'+error);
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
        filters: [
          {
            text: '湖南',
            value: '湖南',
          },
          {
            text: '北京',
            value: '北京',
          },
        ],
        onFilter: (value : any, record : any) => record.comes.indexOf(value) === 0,
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
        title: '黑名单',
        dataIndex: 'isBad',
      },
      {
          title: '操作',
          key: 'action',
          // sorter: true,
          render: (text : any, record : any, index : any) => (
            <Space size="middle">
              <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => deleteCar(text.id)}>
                <a>删除</a>
              </Popconfirm>
              <a onClick={() => addToBad(text.id)}>
                加入黑名单
              </a>
            </Space>
          ),
      },
    ];

    useEffect(() => {
      Axios.get(serverPath.getCarList)
        .then((response) => {
          // console.log(response.data);
          setData(response.data.carList);
        })
        .catch((error) => {
          console.log('获取车辆列表失败'+error);
        })
    },[]);

    const onSelectChange = (selectRowKeys: React.SetStateAction<never[]>) => {
        setSelectKeys(selectRowKeys);
    }
    const rowSelection = {
        selectKeys,
        onChange: onSelectChange,
    }
    const hasSelected = selectKeys.length > 0;

    // 批量删除
    const handleDelete = () => {
        Axios({
          method: 'POST',
          url: serverPath.deleteSomeCars,
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

    // 表格标题
    // const renderTiltle = () => {
    //   return <div className='car-table-title'>
    //     车辆列表
    //   </div>
    // }

    // 表格尾部
    const renderFooter = () => {
      return <div className='car-table-footer'>
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
                <div>
                    <Table 
                        // @ts-ignore
                        rowSelection={rowSelection}
                        dataSource={data}
                        columns={columns}
                        showSorterTooltip={false}
                        rowKey="car_key"
                        // title={renderTiltle}
                        footer={renderFooter}
                    />
                </div>
            </Content>
        </Layout>
    )
}

export default CarList;