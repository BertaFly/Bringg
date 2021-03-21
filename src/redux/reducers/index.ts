import { combineReducers } from 'redux';
import driversReducer from './drivers';
import taskReducer from './tasks';

export default combineReducers({ drivers: driversReducer, tasks: taskReducer });
