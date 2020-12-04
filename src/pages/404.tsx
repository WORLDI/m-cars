import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const history = useHistory();

    const goHome = () => {
        history.push('/index');
    }

    return(
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={goHome}>Back Home</Button>}
        />
    )
}