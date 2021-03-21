import { IPinInfo } from '../interfaces';
import { IDefaultState } from './reducers/drivers';

export const arrayToObject = (array: Array<any>, keyField: string) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export const wait = (time: number) => {
  return new Promise((res) => setTimeout(res, time));
};

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const getAllPins = (
  values: Pick<IDefaultState, 'allIds' | 'byIds'>,
  type: IPinInfo['type'],
) => {
  return values.allIds.map((item) => ({
    id: item,
    type: type,
    latitude: values.byIds[item].latitude,
    longitude: values.byIds[item].longitude,
  }));
};
