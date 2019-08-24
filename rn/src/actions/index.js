import * as types from './types';

export const loginAction = username => ({type: types.LOGIN_ACTION, username});
export const logoutAction = () => ({type: types.LOGOUT_ACTION});
