import { IPinInfo } from '../../interfaces';
import {
  ITask,
  TaskDispatchTypes,
  TASKS_LIST_SUCCESS,
  TASKS_LIST_FAIL,
  TASKS_LIST_LOADING,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_LOADING,
  TASK_CHANGE_VISIBILITY,
} from '../actions/taskActionTypes';
import { arrayToObject, getAllPins } from '../helpers';

interface IDefaultState {
  allIds: Array<string>;
  byIds: Record<string, ITask>;
  loading: boolean;
  updateLoading: boolean;
  taskPins: Array<IPinInfo>;
  visiblePins: Array<string>;
}

const initialState: IDefaultState = {
  loading: false,
  allIds: [],
  byIds: {},
  updateLoading: false,
  taskPins: [],
  visiblePins: [],
};

const taskReducer = (state = initialState, action: TaskDispatchTypes): IDefaultState => {
  switch (action.type) {
    case TASKS_LIST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case TASKS_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TASKS_LIST_SUCCESS: {
      const idsCollection = action.payload.map((task: ITask) => task.id);
      const normalizedData = arrayToObject(action.payload, 'id');
      const taskPins = getAllPins({ allIds: idsCollection, byIds: normalizedData }, 'task');
      return {
        ...state,
        loading: false,
        allIds: idsCollection,
        byIds: normalizedData,
        taskPins,
        visiblePins: taskPins.map((pin) => pin.id),
      };
    }
    case TASK_UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
      };
    case TASK_UPDATE_LOADING:
      return {
        ...state,
        updateLoading: true,
      };
    case TASK_UPDATE_SUCCESS: {
      const {
        payload: { taskId, driver },
      } = action;
      const newByIds = {
        ...state.byIds,
        [taskId]: driver
          ? { ...state.byIds[taskId], assignee: driver }
          : { ...state.byIds[taskId], assignee: undefined },
      };
      return {
        ...state,
        updateLoading: false,
        byIds: newByIds,
      };
    }
    case TASK_CHANGE_VISIBILITY: {
      const {
        payload: { taskId, isVisible },
      } = action;
      return {
        ...state,
        visiblePins: isVisible
          ? [...state.visiblePins, taskId]
          : state.visiblePins.filter((pinId) => pinId !== taskId),
      };
    }
    default: {
      return state;
    }
  }
};

export default taskReducer;
