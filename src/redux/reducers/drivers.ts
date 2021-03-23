import { IPinInfo } from '../../interfaces';
import {
  DriverDispatchTypes,
  IDriver,
  DRIVERS_LIST_LOADING,
  DRIVERS_LIST_FAIL,
  DRIVERS_LIST_SUCCESS,
  DRIVERS_LIST_ASSIGN_TASK,
  DRIVERS_LIST_FILTER_SUCCESS,
  DRIVERS_DELETE_SUCCESS,
} from '../actions/driverActionTypes';
import { arrayToObject, getAllPins } from '../helpers';

export interface IDefaultState {
  allIds: Array<string>;
  byIds: Record<string, IDriver>;
  loading: boolean;
  driversBackup: Record<string, IDriver>;
  isFiltered: boolean;
  driverPins: Array<IPinInfo>;
}

const initialState: IDefaultState = {
  loading: false,
  allIds: [],
  byIds: {},
  driversBackup: {},
  isFiltered: false,
  driverPins: [],
};

const driversReducer = (state = initialState, action: DriverDispatchTypes): IDefaultState => {
  switch (action.type) {
    case DRIVERS_LIST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case DRIVERS_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DRIVERS_LIST_SUCCESS: {
      const idsCollection = action.payload.map((driver: IDriver) => driver.id);
      const normalizedData = arrayToObject(action.payload, 'id');
      const driverPins = getAllPins({ allIds: idsCollection, byIds: normalizedData }, 'driver');
      return {
        ...state,
        loading: false,
        allIds: idsCollection,
        byIds: normalizedData,
        driversBackup: normalizedData,
        driverPins,
      };
    }
    case DRIVERS_LIST_ASSIGN_TASK: {
      const {
        payload: { driverId, taskId },
      } = action;
      const isTaskTaken = Object.values(state.byIds).some((driver) =>
        driver.assignedTasks?.includes(taskId),
      );
      let driverToChange = {};
      if (isTaskTaken) {
        const driver = Object.entries(state.byIds).find(([key, value]) =>
          value.assignedTasks?.includes(taskId),
        );
        driverToChange = {
          [driver?.[0] as string]: {
            ...driver?.[1],
            assignedTasks: driver?.[1].assignedTasks?.filter((task) => task !== taskId) || [],
          },
        };
      }
      const newByIds = driverId
        ? {
            ...state.byIds,
            [driverId]: {
              ...state.byIds[driverId],
              assignedTasks: state.byIds[driverId].assignedTasks
                ? [...(state.byIds[driverId].assignedTasks as Array<string>), taskId]
                : [taskId],
            },
            ...driverToChange,
          }
        : {
            ...state.byIds,
            ...driverToChange,
          };

      return {
        ...state,
        byIds: newByIds,
        driversBackup: newByIds,
      };
    }
    case DRIVERS_LIST_FILTER_SUCCESS: {
      const { payload } = action;
      if (payload) {
        const filteredDrivers = Object.values(state.driversBackup).filter(
          (value) =>
            value.lastName.includes(payload.toLowerCase()) ||
            value.firstName.includes(payload.toLowerCase()),
        );

        if (filteredDrivers?.length) {
          const newByIds = arrayToObject(filteredDrivers, 'id');
          const newAllIds = Object.keys(newByIds);
          const driverPins = getAllPins({ allIds: newAllIds, byIds: newByIds }, 'driver');

          return {
            ...state,
            loading: false,
            isFiltered: true,
            byIds: newByIds,
            allIds: newAllIds,
            driverPins,
          };
        }
        return {
          ...state,
          loading: false,
          byIds: {},
          allIds: [],
          isFiltered: true,
          driverPins: [],
        };
      }
      const driverPins = getAllPins(
        { allIds: Object.keys(state.driversBackup), byIds: state.driversBackup },
        'driver',
      );

      return {
        ...state,
        loading: false,
        byIds: state.driversBackup,
        allIds: Object.keys(state.driversBackup),
        isFiltered: false,
        driverPins,
      };
    }
    case DRIVERS_DELETE_SUCCESS: {
      const newAllIds = state.allIds.filter((driver) => driver !== action.payload);
      const newByIds = arrayToObject(
        newAllIds.map((driver) => state.byIds[driver]),
        'id',
      );
      const driverPins = getAllPins({ allIds: newAllIds, byIds: newByIds }, 'driver');
      const newDriversBackup = Object.values(state.driversBackup).filter(
        (driver) => driver.id !== action.payload,
      );

      return {
        ...state,
        loading: false,
        allIds: newAllIds,
        byIds: newByIds,
        driverPins,
        driversBackup: arrayToObject(newDriversBackup, 'id'),
      };
    }
    default: {
      return state;
    }
  }
};

export default driversReducer;
