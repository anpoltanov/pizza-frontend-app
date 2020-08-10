import { combineReducers } from 'redux';
import list from './list';
import cart from './cart';
import edit from './edit';
import del from './delete';

export default combineReducers({ list, cart, edit, del });
