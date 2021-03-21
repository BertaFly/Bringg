import React, { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Map, Marker } from 'pigeon-maps';
import { Segment } from 'semantic-ui-react';
import { RootStore } from '../../redux/store';
import { useWidth } from './hooks';
import { IPinInfo } from '../../interfaces';
import './styles.scss';

export const LocationMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [width] = useWidth(mapRef);

  const driversState = useSelector((state: RootStore) => state.drivers);
  const tasksState = useSelector((state: RootStore) => state.tasks);

  const filterPinsByVisibility = (values: Array<IPinInfo>) => {
    return values.filter((taskPin) => tasksState.visiblePins.includes(taskPin.id));
  };

  const getLocationPinsByDrivers = () => {
    const filteredTasks = driversState.allIds
      .map((filteredDriver) =>
        Object.values(tasksState.byIds).filter(
          (task) => task.assignee && task.assignee.id === filteredDriver,
        ),
      )
      .flat();
    return filterPinsByVisibility(
      filteredTasks.map(({ latitude, longitude, id }) => ({
        latitude,
        longitude,
        id,
        type: 'task',
      })),
    );
  };

  const mapPins = useMemo(() => {
    return [
      ...driversState.driverPins,
      ...(driversState.isFiltered
        ? getLocationPinsByDrivers()
        : filterPinsByVisibility(tasksState.taskPins)),
    ];
  }, [
    driversState.isFiltered,
    driversState.allIds,
    driversState.driverPins,
    tasksState.taskPins,
    tasksState.visiblePins,
  ]);

  return (
    <div ref={mapRef}>
      <Segment placeholder textAlign='center'>
        <Map
          defaultCenter={[50.437719, 30.514366]}
          defaultZoom={9}
          width={width ? width - 28 : 770}
          height={500}
        >
          {mapPins.map(({ id, longitude, latitude, type }) => (
            <Marker
              key={id}
              anchor={[latitude, longitude]}
              payload={1}
              className={`custom-pin ${type === 'driver' ? 'driver-pin' : 'task-pin'}`}
            />
          ))}
        </Map>
      </Segment>
    </div>
  );
};
