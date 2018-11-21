import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import LoadingReducer from './LoadingReducer';


export default combineReducers({
    main: MainReducer,
    utils: LoadingReducer
  }
);
