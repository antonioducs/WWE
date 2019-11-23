import { Dimensions, StatusBar } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const STATUSBAR_HEIGHT = StatusBar.currentHeight || 24;
export const TABS_WIDTH = SCREEN_WIDTH / 5;

