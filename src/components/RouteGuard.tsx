import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteGuard = (props : any) => {

    const { path, component, location } = props;
    const { pathname } = location;
    const isLogin = sessionStorage.getItem('token');

    if(isLogin) {
        // 如果是登录状态，想要跳转到登录，重定向到首页
        if(pathname === '/login') {
            return <Redirect to='/index' />;
        }else {
            // 如果路由合法，跳转到相应路由
            return (<Route path={path} component={component} />);
        }
    }else {
        // 非登录状态下，当路由合法时，跳转到登录页面
        return <Redirect to='/login' />;
    }
}

export default RouteGuard;