import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import browserHistory from 'history/lib/createBrowserHistory';
import { fromJS } from 'immutable';
import routes      from 'routes';
import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';
//import store from '../shared/store/store.js';
import reducer from '../shared/reducers';

console.log("window initialstate");
console.log(window.__INITIAL_STATE__);
var initialState = window.__INITIAL_STATE__;
//console.log(initialState);
var store = createStore(reducer,initialState);
let history = browserHistory();


render(
    <Provider store={store}>
    <Router children={routes} history={history} />
    </Provider>,
  document.getElementById('app')
);
