import { SET_TABLE_ACTION } from '../actions/types';

export default (state = '', action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case SET_TABLE_ACTION:
      return action.table;
    default:
      return state;
  }
};
