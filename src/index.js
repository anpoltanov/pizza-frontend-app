import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import './translations';
import * as serviceWorker from './serviceWorker';
// reducers and routes
import login from './reducers/login'
import product from './reducers/product/'
import * as ProductList from "./components/product/List";
require('jquery');

const history = createBrowserHistory();
const store = createStore(
    combineReducers({
        router: connectRouter(history),
        product,
        login
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App render={app => (
                <Switch>
                    <Route path="/" component={ProductList.default} strict={true} exact={true}/>
                    <Route render={() => <h1>Not Found</h1>} />
                </Switch>
            )}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
