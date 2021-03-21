import { ITask } from '../../redux/actions/taskActionTypes';

export enum ModalTypes {
  REMOVE = 'remove',
  LOCATION = 'location',
  TASKS_INFO = 'tasks-info',
}

export interface IDriversList {
  showIcons?: boolean;
}

export interface IDriverRemove {
  id: string;
  fullName: string;
}

export interface ITaskInfo {
  id: string;
  fullName: string;
  tasks: Array<ITask>;
}

export interface IDriverLocationInfo {
  id: string;
  fullName: string;
  lat?: number;
  lng?: number;
}

export interface IModalState {
  item: IDriverLocationInfo | IDriverRemove | ITaskInfo | null;
  type: ModalTypes | null;
}
