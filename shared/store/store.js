import { createStore } from 'redux';
import reducer from '../reducers';

var store = createStore(reducer);

console.log("Store is: ",store.getState());

export default store;