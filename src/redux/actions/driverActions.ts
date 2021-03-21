import { Dispatch } from 'redux';
import axios from 'axios';
import {
  DriverDispatchTypes,
  DRIVERS_LIST_LOADING,
  DRIVERS_LIST_FAIL,
  DRIVERS_LIST_SUCCESS,
  DRIVERS_LIST_FILTER_SUCCESS,
  DRIVERS_DELETE_SUCCESS,
} from './driverActionTypes';
import { wait } from '../helpers';

export const GetDrivers = () => async (dispatch: Dispatch<DriverDispatchTypes>) => {
  try {
    dispatch({ type: DRIVERS_LIST_LOADING });

    const res = await axios.get('https://my.api.mockaroo.com/drivers.json?key=6b87fa70');
    dispatch({ type: DRIVERS_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: DRIVERS_LIST_FAIL,
    });
  }
};

export const FilterDrivers = (name?: string) => async (dispatch: Dispatch<DriverDispatchTypes>) => {
  try {
    dispatch({ type: DRIVERS_LIST_LOADING });
    await wait(0);

    dispatch({ type: DRIVERS_LIST_FILTER_SUCCESS, payload: name });
  } catch (error) {
    dispatch({
      type: DRIVERS_LIST_FAIL,
    });
  }
};

export const DeleteDriver = (id: string) => async (dispatch: Dispatch<DriverDispatchTypes>) => {
  try {
    dispatch({ type: DRIVERS_LIST_LOADING });
    await wait(0);

    dispatch({ type: DRIVERS_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DRIVERS_LIST_FAIL,
    });
  }
};
