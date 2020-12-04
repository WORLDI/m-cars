import React,{ useState } from 'react';
import { Layout, Form, Input, Button, Checkbox, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../style/Login.css';

import axios from 'axios';
import serverPath from '../api/api';

interface UserProps {
    username: string,
    password: string,
}

const { Header, Content, Footer } = Layout;

const Login : React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleUserChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    }

    const handlePassChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value)
    }

    const onFinish = (userData: UserProps) => {
        axios({
            method: 'POST',
            url: serverPath.checkLogin,
            data: userData,
            withCredentials: true,
        }).then((res) => {
            // console.log(res);
            if(res.data.data === '登录成功'){
                sessionStorage.setItem('token',`${Date.now()}`);
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    history.push('/index');
                },1000)
            }else {
                message.error('账号或密码错误！登录失败！');
            }
        })
    }

    return(
        <Layout className='login-layout'>
            <Header className='login-layout-header'>欢迎使用</Header>
            <Content className='login-layout-content'>
                <Form
                    name="login_form"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{
                            required: true,
                            message: "Please input your Username!"
                        }]}
                    >
                        <Input 
                            className='login-form-input'
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username"
                            value={username}
                            onChange={handleUserChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Please input your Password!"
                        }]}
                    >
                        <Input
                            className='login-form-input'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer className='login-layout-footer' />
            <Spin spinning={loading} />
        </Layout>
    )
}

export default Login;