import { combineReducers } from 'redux';
import PhoneReducer from './PhoneList.js';

const rootReducer = combineReducers({
  numbers: PhoneReducer
});

export default rootReducer;
