import React, { useState } from 'react';
import { Rose } from '@ant-design/charts';
import { Tag } from 'antd';

var mockData = [
    {
    type: '分类一',
    value: 27,
    },
    {
    type: '分类二',
    value: 25,
    },
    {
    type: '分类三',
    value: 18,
    },
    {
    type: '分类四',
    value: 15,
    },
    {
    type: '分类五',
    value: 10,
    },
    {
    type: '其他',
    value: 5,
    },
];

const FromCharts: React.FC = () => {

    const [data, setData] = useState(mockData);

    
    let config = {
        data: data,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        width: 600,
        height: 600,
        // legend: { position: 'bottom' },
    };
    return (
        <div>
            <Tag className="charts-layout-content-title" color="blue">今日汽车出入分布图</Tag>
            <Rose {...config} />
        </div>
    );
};

export default FromCharts;