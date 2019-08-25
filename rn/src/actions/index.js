import * as types from './types';

export const loginAction = user => ({type: types.LOGIN_ACTION, user});
export const logoutAction = () => ({type: types.LOGOUT_ACTION});
export const setLocationAction = (latitude, longitude) => ({type: types.SET_LOCATION_ACTION, latitude, longitude});
export const setTableAction = table => ({type: types.SET_TABLE_ACTION, table});

