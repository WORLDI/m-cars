import React,{ useState, useEffect } from 'react';
import { Area } from '@ant-design/charts';
import { Tag } from 'antd';
import AllDay from './AllDay';

const ToDay : React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed'+error);
            });
    }

    let config = {
        data: data,
        xField: 'Date',
        yField: 'scales',
        xAxis: { tickCount: 5 },
        areaStyle: function areaStyle() {
            return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
        },
    }

    return(
        <div>
            <div>
                <Tag className="charts-layout-content-title" color="blue">今日汽车出入流量图</Tag>
                <Area {...config} />
            </div>
            <div style={{marginTop:"100px"}}>
                <AllDay />
            </div>
        </div>
    )
}

export default ToDay;