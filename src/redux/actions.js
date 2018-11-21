import * as types from './types';
import axios from '../services/axios';
import { BASE_URL, ENDPOINTS } from '../contants';


const getUrl = endpoint => `${BASE_URL}${endpoint}`;
const tasksEndpoint = getUrl(ENDPOINTS.TASK);
const authEndpoint = getUrl(ENDPOINTS.AUTH);

export const authUser = data => async dispatch => {
  try {
    dispatch({ type: types.AUTH_USER.SUCCESS, payload: { data } });
    dispatch(setLoading(types.AUTH_USER.SUCCESS));
    const res = await axios.post(authEndpoint, { token: data.user.id });
    dispatch(clearLoading(types.AUTH_USER.SUCCESS));
  } catch (error) {
    dispatch(clearLoading(types.AUTH_USER.SUCCESS));
    dispatch({ type: types.AUTH_USER.ERROR, payload: { data: error.message } });
  }
};

export const getTasks = () => async dispatch => {
  try {
    dispatch(setLoading(types.GET_TASKS.SUCCESS));
    const res = await axios.get(tasksEndpoint);
    dispatch({ type: types.GET_TASKS.SUCCESS, payload: res.data });
    dispatch(clearLoading(types.GET_TASKS.SUCCESS));
  } catch (error) {
    dispatch(clearLoading(types.GET_TASKS.SUCCESS));
    dispatch({ type: types.GET_TASKS.ERROR, payload: { data: error.message } });
  }
};
export const getResult = () => async dispatch => {
  try {
    const res = await axios.get(`${tasksEndpoint}/result`);
    dispatch({ type: types.GET_RESULT.SUCCESS, payload:res.data });
  } catch (error) {
    dispatch({ type: types.GET_RESULT.ERROR, payload: { data: error.message } });
  }
};

export const setTask = data => async dispatch => {
  try {
    const res = await axios.post(tasksEndpoint, data);
    dispatch({ type: types.SET_TASK.SUCCESS, payload: { data: res.data } });
  } catch (error) {
    dispatch({ type: types.SET_TASK.ERROR, payload: { data: error.message } });
  }
};

export const updateTask = ({ data, id }) => async dispatch => {
  try {
    const res = await axios.put(`${tasksEndpoint}/${id}`, data);
    dispatch({ type: types.UPDATE_TASK.SUCCESS, payload: { data: res.data } });
  } catch (error) {
    dispatch({ type: types.UPDATE_TASK.ERROR, payload: { data: error.message } });
  }
};

export const deleteTask = id => async dispatch => {
  try {
    const res = await axios.delete(`${tasksEndpoint}/${id}`);
    dispatch({ type: types.DELETE_TASK.SUCCESS, payload: { data: res.data } });
  } catch (error) {
    dispatch({ type: types.DELETE_TASK.ERROR, payload: { data: error.message } });
  }
};
export const changeDebit = data => async dispatch => {
  try {
    const res = await axios.post(`${authEndpoint}/result`, { data });
    dispatch({ type: types.CHANGE_DEBIT.SUCCESS, payload: { data: res.data } });
  } catch (error) {
    dispatch({ type: types.CHANGE_DEBIT.ERROR, payload: { data: error.message } });
  }
};

// Simple non-rest actions

export const logout = () => dispatch => {
  dispatch({ type: types.LOGOUT });
};


// loading
export const setLoading = payload => dispatch => {
  dispatch({ type: types.SET_LOADING, payload });
};
export const clearLoading = payload => dispatch => {
  dispatch({ type: types.CLEAR_LOADING, payload });
};