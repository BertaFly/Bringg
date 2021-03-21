export interface IOption {
  value?: string;
  text: string;
}

export interface IPinInfo {
  latitude: number;
  longitude: number;
  id: string;
  type: 'driver' | 'task';
}
