import React from 'react';
import { Button, Item, Icon } from 'semantic-ui-react';
import { getFullName } from '../../../helpers/stringHelpers';
import { IDriver } from '../../../redux/actions/driverActionTypes';

interface IDriverItem extends IDriver {
  onDriverRemove: (id: string, firstName: string, lastName: string) => void;
  onShowTaskDetails: (assignedTasks: Array<string>, fullName: string) => void;
  showIcons?: boolean;
  onCheckDriverLocation: (fullName: string, latitude: number, longitude: number) => void;
}

export const DriverItem: React.FC<IDriverItem> = ({
  id,
  firstName,
  lastName,
  picture,
  age,
  latitude,
  longitude,
  assignedTasks,
  onDriverRemove,
  onShowTaskDetails,
  showIcons,
  onCheckDriverLocation,
}) => {
  const fullName = getFullName({ firstName, lastName });
  return (
    <Item>
      <Item.Image
        size='tiny'
        src={picture || 'https://semantic-ui.com/images/avatar/large/chris.jpg'}
      />
      <Item.Content>
        <Item.Header>{fullName}</Item.Header>
        <Item.Meta>Age: {age}</Item.Meta>
        <Item.Extra>
          <Button.Group widths='3'>
            <Button
              basic
              color='blue'
              onClick={() => onShowTaskDetails(assignedTasks || [], fullName)}
              disabled={!assignedTasks?.length}
            >
              {showIcons ? (
                <Icon name='clipboard' color='blue' />
              ) : (
                `Tasks: ${assignedTasks?.length || 0}`
              )}
            </Button>
            <Button
              basic
              color='green'
              onClick={() => onCheckDriverLocation(fullName, latitude, longitude)}
            >
              {showIcons ? <Icon name='location arrow' color='green' /> : 'Location'}
            </Button>
            <Button basic color='red' onClick={() => onDriverRemove(id, firstName, lastName)}>
              {showIcons ? <Icon name='trash' color='red' /> : 'Remove'}
            </Button>
          </Button.Group>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
