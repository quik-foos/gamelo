import * as types from './types';

export const loginAction = user => ({type: types.LOGIN_ACTION, user});
export const logoutAction = () => ({type: types.LOGOUT_ACTION});
