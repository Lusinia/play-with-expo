import Immutable from 'seamless-immutable';
import * as types from '../types';


const initialState = Immutable({
  tasks: [],
  debit: 0,
  credit: 0,
  token: '',
  currency: '',
  user: null
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RESULT.SUCCESS: {
      const {currency, debit, credit} = action.payload.data;
      return {
        ...state,
        currency,
        debit,
        credit
      };
    }
    case types.AUTH_USER.SUCCESS:
      return {
        ...state,
        token: action.payload.data.user.id
      };
    case types.LOGOUT:
      return {
        ...state,
        token: ''
      };
    case types.GET_TASKS.SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        tasks: data
      };
    }
    case types.CHANGE_DEBIT.SUCCESS:
      return {
        ...state,
        debit: action.payload.data.result.debit
      };
    default:
      return state;
  }
};

export default reducer;
