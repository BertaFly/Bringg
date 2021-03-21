import { IDriver } from './driverActionTypes';

export interface ITask {
  id: string;
  title: string;
  scheduledFor: string;
  address: string;
  assignee?: IDriver;
  latitude: number;
  longitude: number;
}

export const TASKS_LIST_LOADING = 'TASKS_LIST_LOADING';
export const TASKS_LIST_FAIL = 'TASKS_LIST_FAIL';
export const TASKS_LIST_SUCCESS = 'TASKS_LIST_SUCCESS';
export const TASK_UPDATE_LOADING = 'TASK_UPDATE_LOADING';
export const TASK_UPDATE_FAIL = 'TASK_UPDATE_FAIL';
export const TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS';
export const TASK_CHANGE_VISIBILITY = 'TASK_CHANGE_VISIBILITY';

export interface TasksLoading {
  type: typeof TASKS_LIST_LOADING;
}

export interface TasksFail {
  type: typeof TASKS_LIST_FAIL;
}

export interface TasksSuccess {
  type: typeof TASKS_LIST_SUCCESS;
  payload: Array<ITask>;
}

export interface TaskUpdateLoading {
  type: typeof TASK_UPDATE_LOADING;
}

export interface TaskUpdateFail {
  type: typeof TASK_UPDATE_FAIL;
}

export interface TasksUpdateSuccess {
  type: typeof TASK_UPDATE_SUCCESS;
  payload: { driver?: IDriver; taskId: ITask['id'] };
}

export interface TaskChangeVisibility {
  type: typeof TASK_CHANGE_VISIBILITY;
  payload: {
    taskId: string;
    isVisible: boolean;
  };
}

export type TaskDispatchTypes =
  | TasksLoading
  | TasksFail
  | TasksSuccess
  | TaskUpdateLoading
  | TaskUpdateFail
  | TasksUpdateSuccess
  | TaskChangeVisibility;
