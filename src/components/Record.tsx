/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Space, Popconfirm, message, DatePicker } from 'antd';
import Axios from 'axios';
import serverPath from '../api/api';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../style/Record.css';
import moment from 'moment';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Record : React.FC = () => {

    const [data, setData] = useState([]);
    const [selectKeys, setSelectKeys] = useState([]);

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

    // 加入黑名单
    // const addToBad = (id : any) => {
    //   Axios.post(serverPath.addToBad+id)
    //     .then(response => {
    //       if(response.data.updateSuccess){
    //         message.success('加入黑名单成功');
    //       }
    //     }).catch(error => {
    //       message.error('加入黑名单失败'+error);
    //     })
    // }

    // 时间字符串转时间戳
    const getTimes = (time : string) => {
      return new Date(time).getTime();
    }

    // 进入时间筛选
    const onStartChange = (value : any, dateString : any) => {
      console.log(dateString[0],dateString[1]);
      const newData = data.filter((item : any) => {
        return getTimes(item.inTime) >= getTimes(dateString[0]) && getTimes(item.inTime) <= getTimes(dateString[1]);
      });
      console.log(newData);
      setData(newData);
      console.log(data);
    }

    // 离开时间筛选
    const onEndChange = (value : any, dateString : any) => {
      const newData = data.filter((item : any) => {
        return getTimes(item.outTime) >= getTimes(dateString[0]) && getTimes(item.outTime) <= getTimes(dateString[1]);
      });
      console.log(newData);
      setData(newData);
      console.log(data);
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
        title: '进入时间',
        dataIndex: 'inTime',
        filterDropdown: () => (
          <RangePicker
            ranges={{
              Today: [moment().startOf('day'), moment().endOf('day')],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onStartChange}
          />
        ),
        // onFilter: (value : any, record : any) => record.inTime >= startTime,
      },
      {
        title: '离开时间',
        dataIndex: 'outTime',
        filterDropdown: () => (
          <RangePicker
            ranges={{
              Today: [moment().startOf('day'), moment().startOf('day')],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onEndChange}
          />
        ),
        // onFilter: (value : any, record : any) => record.outTime <= endTime || record.outTime==='',
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
              {/* <a onClick={() => addToBad(text.id)}>
                加入黑名单
              </a> */}
            </Space>
          ),
      },
    ];

    useEffect(() => {
      Axios.get(serverPath.getRecordList)
        .then((response) => {
          console.log(response.data.recordList);
          setData(response.data.recordList);
        }).catch((error) => {
          console.log('获取车辆记录列表失败'+error);
        })
    },[])

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

    // 表格标题
    // const renderTitle = () => {
    //   return <div className='record-table-title'>
    //     车辆出入记录
    //   </div>
    // }

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

export default Record;