import { ITask } from './taskActionTypes';

export const DRIVERS_LIST_LOADING = 'DRIVERS_LIST_LOADING';
export const DRIVERS_LIST_FAIL = 'DRIVERS_LIST_FAIL';
export const DRIVERS_LIST_SUCCESS = 'DRIVERS_LIST_SUCCESS';
export const DRIVERS_LIST_ASSIGN_TASK = 'DRIVERS_LIST_ASSIGN_TASK';
export const DRIVERS_LIST_FILTER_SUCCESS = 'DRIVERS_LIST_FILTER_SUCCESS';
export const DRIVERS_DELETE_SUCCESS = 'DRIVERS_DELETE_SUCCESS';

export interface IDriver {
  id: string;
  firstName: string;
  lastName: string;
  picture?: string;
  age: number;
  latitude: number;
  longitude: number;
  assignedTasks: Array<string> | null;
}

export interface DriversLoading {
  type: typeof DRIVERS_LIST_LOADING;
}

export interface DriversFail {
  type: typeof DRIVERS_LIST_FAIL;
}

export interface DriversSuccess {
  type: typeof DRIVERS_LIST_SUCCESS;
  payload: Array<IDriver>;
}

export interface DriverAssignTask {
  type: typeof DRIVERS_LIST_ASSIGN_TASK;
  payload: { driverId: IDriver['id'] | null; taskId: ITask['id'] };
}

export interface DriversFilterSuccess {
  type: typeof DRIVERS_LIST_FILTER_SUCCESS;
  payload?: string;
}

export interface DriverDeleteSuccess {
  type: typeof DRIVERS_DELETE_SUCCESS;
  payload: string;
}

export type DriverDispatchTypes =
  | DriversLoading
  | DriversFail
  | DriversSuccess
  | DriverAssignTask
  | DriversFilterSuccess
  | DriverDeleteSuccess;
