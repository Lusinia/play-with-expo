import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import AuthLoading from '../screens/AuthLoading';


const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default RootNavigator;
