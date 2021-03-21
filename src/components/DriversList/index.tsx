import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item, Dimmer, Loader } from 'semantic-ui-react';
import { getFullName } from '../../helpers/stringHelpers';
import { GetDrivers } from '../../redux/actions/driverActions';
import { RootStore } from '../../redux/store';
import { IDriversList, IModalState, ModalTypes } from './interfaces';
import { DriversTaskModal } from '../Modals/DriversTaskModal';
import { LocationModal } from '../Modals/LocationModal';
import { RemoveDriverModal } from '../Modals/RemoveDriverModal';
import { DriverItem } from './DriverItem';

export const DriversList: React.FC<IDriversList> = ({ showIcons }) => {
  const dispatch = useDispatch();
  const driversState = useSelector((state: RootStore) => state.drivers);
  const tasksState = useSelector((state: RootStore) => state.tasks);
  const initialModalState: IModalState = { item: null, type: null };
  const [currentModal, setCurrentModal] = useState<IModalState>(initialModalState);

  useEffect(() => {
    dispatch(GetDrivers());
  }, []);

  const onCloseModal = () => setCurrentModal(initialModalState);

  return (
    <>
      <Item.Group divided>
        {driversState.loading ? (
          <Dimmer active inverted>
            <Loader size='medium'>Loading</Loader>
          </Dimmer>
        ) : (
          Object.entries(driversState.byIds).map(([key, value]) => (
            <DriverItem
              key={key}
              {...value}
              onDriverRemove={(id, firstName, lastName) =>
                setCurrentModal({
                  item: { id, fullName: getFullName({ firstName, lastName }) },
                  type: ModalTypes.REMOVE,
                })
              }
              onShowTaskDetails={(assignedTasks = [], fullName: string) =>
                setCurrentModal({
                  item: {
                    id: fullName,
                    tasks: assignedTasks.map((task: string) => tasksState.byIds[task]),
                    fullName,
                  },
                  type: ModalTypes.TASKS_INFO,
                })
              }
              showIcons={showIcons}
              onCheckDriverLocation={(fullName, lat, lng) =>
                setCurrentModal({
                  item: {
                    id: fullName,
                    lat,
                    lng,
                    fullName,
                  },
                  type: ModalTypes.LOCATION,
                })
              }
            />
          ))
        )}
      </Item.Group>
      <RemoveDriverModal
        open={currentModal.type === ModalTypes.REMOVE}
        onClose={onCloseModal}
        dataSource={currentModal.item}
      />
      <DriversTaskModal
        open={currentModal.type === ModalTypes.TASKS_INFO}
        onClose={onCloseModal}
        dataSource={currentModal.item}
      />
      <LocationModal
        open={currentModal.type === ModalTypes.LOCATION}
        onClose={onCloseModal}
        dataSource={currentModal.item}
      />
    </>
  );
};
