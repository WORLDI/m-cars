import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Menu, Layout, Avatar, Badge } from 'antd';

import 'antd/dist/antd.css';
import '../style/Manage.css';
import { 
    DesktopOutlined, 
    PieChartOutlined, 
    FileOutlined, 
    CarOutlined, 
    UserOutlined,
    MessageTwoTone,
    SmileTwoTone,
} from '@ant-design/icons';
import Record from '../components/Record';
import ShowCharts from '../components/ShowCharts';
import CarList from '../components/CarList';
import BadCar from '../components/BadCar';
import QueryCar from '../components/QueryCar';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ManageIndex = () => {

    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();

    const handleClick = (e: any) => {

        switch(e.key){
            case 'overview':
                history.push('/index/');
                break;
            case 'record':
                history.push('/manage/record');
                break;
            case 'car-list':
                history.push('/manage/car-list');
                break;
            case 'bad-car':
                history.push('/manage/bad-car');
                break;
            case 'query':
                history.push('/manage/query');
                break;
            default:
                history.push('/404');
                break;
        }
    }

    return (
        <Layout className="manage-layout">
            <Sider className="manage-layout-sider" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="manage-layout-logo" />
                <Menu 
                    className="manage-layout-menu" 
                    theme="dark" 
                    defaultSelectedKeys={['1']} 
                    mode="inline"
                    onClick={handleClick}
                >
                    <Menu.Item key="overview" icon={<PieChartOutlined />}>
                        概览
                    </Menu.Item>
                    <Menu.Item key="record" icon={<DesktopOutlined />}>
                        车辆进出记录
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="暂定">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<CarOutlined />} title="车辆管理">
                        <Menu.Item key="car-list">车辆列表</Menu.Item>
                        <Menu.Item key="bad-car">黑名单</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="query" icon={<FileOutlined />}>
                        查询
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout manage-layout-right">
                <Header className="site-layout-background manage-layout-right-header">
                    <div className="manage-layout-right-header-container">
                        <Avatar
                            size="large"
                            icon={<SmileTwoTone style={{fontSize:'40px'}} />}
                        />
                        <Badge count={1} size="default">
                            <Avatar size="large" icon={<MessageTwoTone style={{fontSize:'40px'}} />} />
                        </Badge>
                    </div>
                </Header>
                <Content className="manage-layout-right-content">
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Route path="/index/" component={ShowCharts} />
                        <Route path="/manage/record" component={Record} />
                        <Route path="/manage/car-list" exact component={CarList} />
                        <Route path="/manage/bad-car" exact component={BadCar} />
                        <Route path="/manage/query" exact component={QueryCar} />
                    </div>
                </Content>
                <Footer className="manage-layout-right-footer">Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default ManageIndex;
