import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import ToDay from './Charts/ToDay';

import 'antd/dist/antd.css';
import '../style/ShowCharts.css';
import { Route } from 'react-router-dom';
import FromCharts from './Charts/FromCharts';

const { Content } = Layout;

const ShowCharts = () => {

    return (
        <Layout className="charts-layout">
            <Content className="charts-layout-content">
                <Breadcrumb className="charts-layout-content-bread">
                    <Breadcrumb.Item href='/index/' key="basic">汽车出入概览</Breadcrumb.Item>
                    <Breadcrumb.Item href='/index/detail' key="detailed">详细</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background">
                    <Route path='/index/' exact component={ToDay} />
                    <Route path='/index/detail' component={FromCharts} />
                </div>
            </Content>
        </Layout>
    )
}

export default ShowCharts;