import React from 'react';
import { Route } from 'react-router-dom';
import { Login } from '../components/user/';

export default [
    <Route path="/login" component={Login} exact key="login" />,
];
