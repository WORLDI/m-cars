import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import ManageIndex from '../pages/ManageIndex';
import NotFound from '../pages/404';

import RouteGuard from './RouteGuard';

const MainRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/login' component={Login} />
                <RouteGuard path='/index' component={ManageIndex} />
                <RouteGuard path='/manage' component={ManageIndex} />
                <Route path='/404' component={NotFound} />
            </Switch>
        </Router>
    )
}

export default MainRouter;