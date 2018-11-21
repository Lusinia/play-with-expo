import * as types from './types';

  const isLoading = (state, requestId) => state.utils.isLoading.entities[requestId];

export const tasks = state => state.main.tasks;
export const result = state => state.main.result;
export const debit = state => state.main.debit;
export const spent = state => state.main.credit;

export const isLoadingTasks = state => isLoading(state, types.GET_TASKS.SUCCESS);
