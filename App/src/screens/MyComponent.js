import * as React from 'react';
import AdmConfigScreen from './AdmConfigScreen';
import AdmRfidScreen from './AdmRfidScreen';
import AdmUsersScreen from './AdmUsersScreen';
import { BottomNavigation } from 'react-native-paper';

export default class MyComponent extends React.Component {


  state = {
    index: 1,
    routes: [
      { key: 'users', title: 'Usuários', icon: 'people' },
      { key: 'config', title: 'Configurações', icon: 'navigation' },
      { key: 'rfid', title: 'RFID', icon: 'wifi' },
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    users: AdmUsersScreen,
    config: AdmConfigScreen,
    rfid: AdmRfidScreen,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{ backgroundColor: '#4169E1' }}
      />
    );
  }
};

