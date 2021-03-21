import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { DeleteDriver } from '../../../redux/actions/driverActions';
import { IModalState } from '../../DriversList/interfaces';

interface IRemoveDriverModal {
  open: boolean;
  onClose: () => void;
  dataSource: IModalState['item'];
}

export const RemoveDriverModal: React.FC<IRemoveDriverModal> = ({ open, onClose, dataSource }) => {
  const dispatch = useDispatch();
  const onConfirm = () => {
    if (dataSource) {
      dispatch(DeleteDriver(dataSource.id));
      onClose();
    }
  };

  return (
    <Modal centered={false} open={open} onClose={onClose} size='tiny'>
      <Modal.Header>Remove forever</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Are you sure that you want to delete {dataSource?.fullName}?
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button basic color='red' onClick={onConfirm}>
          Remove
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
