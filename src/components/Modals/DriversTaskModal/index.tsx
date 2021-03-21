import React from 'react';
import { Button, Modal, Item } from 'semantic-ui-react';
import { formatDate } from '../../../helpers/stringHelpers';
import { IModalState } from '../../DriversList/interfaces';
import './styles.scss';

interface IDriversTaskModal {
  open: boolean;
  onClose: () => void;
  dataSource: IModalState['item'];
}

export const DriversTaskModal: React.FC<IDriversTaskModal> = ({ open, onClose, dataSource }) => (
  <Modal centered={false} open={open} onClose={onClose}>
    <Modal.Header>{`${dataSource?.fullName || 'John Dou'}'s tasks:`}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Item.Group divided>
          {dataSource &&
            'tasks' in dataSource &&
            dataSource.tasks.map((task) => (
              <Item key={task.id}>
                <Item.Content>
                  <Item.Header>{task.title}</Item.Header>
                  <Item.Meta>{task.address}</Item.Meta>
                  <Item.Description className='modal-description'>
                    <span>Scheduled for: {formatDate(task.scheduledFor)},</span>
                    <span>
                      Location: {task.latitude}, {task.latitude}
                    </span>
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose}>OK</Button>
    </Modal.Actions>
  </Modal>
);
