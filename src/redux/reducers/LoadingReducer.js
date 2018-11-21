import _ from 'lodash';
import Immutable from 'seamless-immutable';
import * as types from '../types';


const initialState = Immutable({
  isLoading: {
    entities: {}
  }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.SET_LOADING:
    return {
      ...state,
      isLoading: {
        entities: {
          ...state.isLoading.entities,
          [action.payload]: true
        }
      }
    };
  case types.CLEAR_LOADING: {
    const newList = _.omit(state.isLoading.entities, action.payload);
    return {
      ...state,
      isLoading: {
        entities: {
          ...newList
        }
      }
    };
  }
  default:
    return state;
  }
};


export default reducer;
