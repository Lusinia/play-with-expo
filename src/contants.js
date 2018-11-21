import React from 'react';
import { Dimensions } from 'react-native';


export const BASE_URL = 'https://whats-paid.herokuapp.com';
export const ENDPOINTS = {
  RESULT: '',
  TASK: '/api/tasks',
  AUTH: '/api/user'
};

const { width, height } = Dimensions.get('window');


const colors = {
  primary: '#661141',
  primaryDark: '#440026',
  primaryLight: '#AA5585',
  secondary: '#116611',
  secondaryDark: '#004400',
  secondaryLight: '#55AA55',
  red: '#801515',
  redBg: '#FFAAAA',
  redLight: '#D46A6A',
  green: '#567714',
  greenDark: '#354F00',
  greenLight: '#A5C663',
  greyOpacity: 'rgba(0,0,0,0.2)',
  warning: '#F79F22',
  greenBg: '#88CC88'
};

export { width, height, colors };


