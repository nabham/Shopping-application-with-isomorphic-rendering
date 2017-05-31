import ProductReducer from './ProductReducer';
import UserReducer from './UserReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  UserReducer,
  ProductReducer
})
