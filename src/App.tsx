import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Segment, Grid, Input } from 'semantic-ui-react';
import { FilterDrivers } from './redux/actions/driverActions';
import { debounce } from './redux/helpers';
import { DriversList } from './components/DriversList';
import { TasksList } from './components/TasksList';
import { LocationMap } from './components/LocationMap';
import { useWidth } from './components/LocationMap/hooks';
import './styles.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [width] = useWidth(layoutRef);
  const dispatch = useDispatch();

  const handleChangeDriverName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(FilterDrivers(event.target.value));
  };

  return (
    <div className='page-layout' ref={layoutRef}>
      <Segment inverted color='blue'>
        <Header as='h1' textAlign='center' inverted>
          Welcome to Drivers App
        </Header>
      </Segment>
      <Grid>
        <Grid.Column mobile={16} tablet={5} largeScreen={6} verticalAlign='top'>
          <Segment className='drivers-section'>
            <Input
              fluid
              icon='filter'
              placeholder='Filter Name ...'
              onChange={debounce(handleChangeDriverName, 300)}
            />
            <DriversList showIcons={width ? width < 992 : false} />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={11} largeScreen={10}>
          <LocationMap />
        </Grid.Column>
      </Grid>
      <Segment>
        <TasksList />
      </Segment>
    </div>
  );
}

export default App;
