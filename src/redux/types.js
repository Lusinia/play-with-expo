import createType from '../services/createAsyncType';


export const AUTH_USER = createType('AUTH_USER');

export const GET_RESULT = createType('GET_RESULT');
export const GET_TASKS = createType('GET_TASKS');
export const SET_TASK = createType('SET_TASK');
export const UPDATE_TASK = createType('UPDATE_TASK');
export const DELETE_TASK = createType('DELETE_TASK');
export const CHANGE_DEBIT = createType('CHANGE_DEBIT');

export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';
export const CLEAR_LOADING = 'CLEAR_LOADING';
