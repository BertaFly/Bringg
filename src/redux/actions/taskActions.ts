import { Dispatch } from 'redux';
import axios from 'axios';
import {
  TaskDispatchTypes,
  TASKS_LIST_LOADING,
  TASKS_LIST_FAIL,
  TASKS_LIST_SUCCESS,
  TASK_UPDATE_LOADING,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_SUCCESS,
  ITask,
  TASK_CHANGE_VISIBILITY,
} from './taskActionTypes';
import { wait } from '../helpers';
import { IDriver, DriverDispatchTypes, DRIVERS_LIST_ASSIGN_TASK } from './driverActionTypes';

export const GetTasks = () => async (dispatch: Dispatch<TaskDispatchTypes>) => {
  try {
    dispatch({ type: TASKS_LIST_LOADING });

    const res = await axios.get('https://my.api.mockaroo.com/tasks.json?key=6b87fa70');
    dispatch({ type: TASKS_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: TASKS_LIST_FAIL,
    });
  }
};

export const UpdateTask = (taskId: ITask['id'], driver?: IDriver) => async (
  dispatch: Dispatch<TaskDispatchTypes | DriverDispatchTypes>,
) => {
  try {
    dispatch({ type: TASK_UPDATE_LOADING });

    await wait(0);
    dispatch({ type: TASK_UPDATE_SUCCESS, payload: { driver, taskId } });
    dispatch({
      type: DRIVERS_LIST_ASSIGN_TASK,
      payload: { driverId: driver ? driver.id : null, taskId },
    });
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_FAIL,
    });
  }
};

export const ChangeTaskVisibility = (taskId: string, isVisible: boolean) => (
  dispatch: Dispatch<TaskDispatchTypes | DriverDispatchTypes>,
) => {
  dispatch({
    type: TASK_CHANGE_VISIBILITY,
    payload: {
      taskId,
      isVisible,
    },
  });
};
