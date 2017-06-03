import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import browserHistory from 'history/lib/createBrowserHistory';
import routes from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../shared/reducers';

let initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const store = createStore(reducer,initialState);
let history = browserHistory();

render(
    <Provider store={store}>
    <Router children={routes} history={history} />
    </Provider>,
  document.getElementById('app')
);
