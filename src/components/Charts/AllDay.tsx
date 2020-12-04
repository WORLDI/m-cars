import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/charts';

const AllDay: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };

    let config = {
      data: data,
      xField: 'Date',
      yField: 'scales',
      xAxis: { tickCount: 5 },
      slider: {
        start: 0.1,
        end: 0.9,
        trendCfg: { isArea: true },
      },
    };
    // @ts-ignore
    return <Area {...config} />;
  };
  export default AllDay;