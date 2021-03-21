import React, { useState } from 'react';
import { Table, Select, Checkbox, CheckboxProps } from 'semantic-ui-react';
import { ITask } from '../../../redux/actions/taskActionTypes';
import { IOption } from '../../../interfaces';
import { formatDate } from '../../../helpers/stringHelpers';

interface ITaskItemProps {
  task: ITask;
  driverOptions: Array<IOption>;
  onTaskAssign: (driverId: IOption['value'], taskId: ITask['id']) => void;
  isVisible?: boolean;
  toggleTaskVisibility?: (taskId: string, isVisible: boolean) => void;
}

export const TaskItem: React.FC<ITaskItemProps> = ({
  task: { id, title, scheduledFor, address, assignee, latitude, longitude },
  driverOptions,
  onTaskAssign,
  isVisible,
  toggleTaskVisibility,
}) => {
  const [isTaskVisibleOnMap, setTaskVisibleOnMap] = useState(isVisible);

  return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{formatDate(scheduledFor)}</Table.Cell>
      <Table.Cell>{address}</Table.Cell>
      <Table.Cell>
        <Select
          placeholder='Select driver'
          options={driverOptions}
          defaultValue={assignee?.id}
          onChange={(event, data) => onTaskAssign(data.value as string, id)}
        />
      </Table.Cell>
      <Table.Cell>{latitude}</Table.Cell>
      <Table.Cell>{longitude}</Table.Cell>
      <Table.Cell>
        <Checkbox
          toggle
          checked={isTaskVisibleOnMap}
          onChange={(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
            setTaskVisibleOnMap(data.checked);
            toggleTaskVisibility?.(id, !!data.checked);
          }}
        />
      </Table.Cell>
    </Table.Row>
  );
};
