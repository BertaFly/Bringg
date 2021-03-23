import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Loader } from 'semantic-ui-react';
import { getFullName } from '../../helpers/stringHelpers';
import { IOption } from '../../interfaces';
import { ChangeTaskVisibility, GetTasks, UpdateTask } from '../../redux/actions/taskActions';
import { ITask } from '../../redux/actions/taskActionTypes';
import { arrayToObject } from '../../redux/helpers';
import { RootStore } from '../../redux/store';
import { TaskItem } from './TaskItem';

export const TasksList: React.FC = () => {
  const dispatch = useDispatch();
  const driversState = useSelector((state: RootStore) => state.drivers);
  const tasksState = useSelector((state: RootStore) => state.tasks);

  useEffect(() => {
    dispatch(GetTasks());
  }, []);

  const driverOptions = useMemo(() => {
    return [
      { value: undefined, text: 'Unassigned' },
      ...driversState.allIds.map((driverId) => {
        const { firstName, lastName } = driversState.byIds[driverId];
        return { value: driverId, text: getFullName({ firstName, lastName }) };
      }),
    ];
  }, [driversState.allIds]);

  const handleAssignTask = (driverId: IOption['value'], taskId: ITask['id']) => {
    dispatch(UpdateTask(taskId, driverId ? driversState.byIds[driverId] : (driverId as undefined)));
  };

  const tasksToDisplay = useMemo(() => {
    const filterTasks = () =>
      arrayToObject(
        Object.values(tasksState.byIds).filter(
          (task) => task.assignee && driversState.allIds.includes(task.assignee.id),
        ),
        'id',
      );
    return driversState.isFiltered ? filterTasks() : tasksState.byIds;
  }, [tasksState.allIds, driversState.isFiltered, driversState.allIds]);

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Scheduled for</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Assign to</Table.HeaderCell>
          <Table.HeaderCell>LAT</Table.HeaderCell>
          <Table.HeaderCell>LNG</Table.HeaderCell>
          <Table.HeaderCell>Display</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasksState.loading ? (
          <Table.Row>
            <Table.Cell colSpan='7'>
              <Loader active inline='centered' size='medium'>
                Loading
              </Loader>
            </Table.Cell>
          </Table.Row>
        ) : (
          Object.entries(tasksToDisplay).map(([key, value]) => (
            <TaskItem
              key={key}
              task={value as ITask}
              driverOptions={driverOptions}
              onTaskAssign={handleAssignTask}
              isVisible={true}
              toggleTaskVisibility={(taskId, isVisible) =>
                dispatch(ChangeTaskVisibility(taskId, isVisible))
              }
            />
          ))
        )}
      </Table.Body>
    </Table>
  );
};
