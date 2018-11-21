import { Font } from 'expo';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel3 from './src/services/autoMergeLevel3';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';

import RootNavigator from './src/navigators/RootNavigator';
import reducer from './src/redux/reducers';


console.disableYellowBox = true;

if (module.hot) {
  module.hot.accept();
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel3
};

const persistedReducer = persistReducer(persistConfig, reducer);

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, logger));
  return createStore(persistedReducer, initialState, enhancer);
}

export const store = configureStore({});
const persistor = persistStore(store);

// Uncomment in case you want to delete state from persistant storage.
// persistor.purge();

export default class App extends React.Component {
  state = {
    isLoadedFonts: false
  };

  componentDidMount() {
    Font.loadAsync({
      'regular': require('./src/assets/fonts/TeamWork.Regular.otf'),
    }).then(() => {
      this.setState({ isLoadedFonts: true });
    }).catch(error => {
      console.log('error', error);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.state.isLoadedFonts ? <RootNavigator/> : <View/>}
        </PersistGate>
      </Provider>
    );
  }
}
