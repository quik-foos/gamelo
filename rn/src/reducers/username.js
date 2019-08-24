import {LOGIN_ACTION, LOGOUT_ACTION} from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return action.username;
    case LOGOUT_ACTION:
      return '';
    default:
      return state;
  }
};
