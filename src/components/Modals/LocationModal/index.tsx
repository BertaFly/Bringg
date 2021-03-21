import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Map, Marker } from 'pigeon-maps';
import { IModalState } from '../../DriversList/interfaces';
import './styles.scss';

interface IRemoveDriverModal {
  open: boolean;
  onClose: () => void;
  dataSource: IModalState['item'];
}

const KYIV_GEO_CODE = {
  lat: 50.450001,
  lng: 30.523333,
};

export const LocationModal: React.FC<IRemoveDriverModal> = ({ open, onClose, dataSource }) => (
  <Modal centered={false} open={open} onClose={onClose} size='large'>
    <Modal.Header>{dataSource?.fullName} location:</Modal.Header>
    <Modal.Content>
      <Modal.Description className='modal-content-centered'>
        {dataSource && 'lat' in dataSource && 'lng' in dataSource && (
          <Map
            defaultCenter={[
              dataSource.lat || KYIV_GEO_CODE.lat,
              dataSource.lng || KYIV_GEO_CODE.lng,
            ]}
            defaultZoom={11}
            width={770}
            height={500}
          >
            <Marker
              anchor={[dataSource.lat || KYIV_GEO_CODE.lat, dataSource.lng || KYIV_GEO_CODE.lng]}
              payload={1}
              className='custom-pin driver-pin'
            />
          </Map>
        )}
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose}>OK</Button>
    </Modal.Actions>
  </Modal>
);
