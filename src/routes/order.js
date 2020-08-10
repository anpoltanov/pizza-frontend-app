import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { Edit, List } from '../components/order/';

export default [
    <Redirect exact strict from="/users/:user_id/orders" to="/users/:user_id/orders/" />,
    <Redirect exact strict from="/users/:user_id/orders/:id/" to="/users/:user_id/orders/show/:id" />,
    <Route path="/users/:user_id/orders/edit/:id" component={Edit} exact key="update" />,
    // <Route path="/users/:user_id/orders/show/:id" component={Show} exact key="show" />,
    <Route path="/users/:user_id/orders/" component={List} exact strict key="list" />,
];
