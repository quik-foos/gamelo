import { SET_LOCATION_ACTION } from '../actions/types';

export default (state = {latitude: 0, longitude: 0}, action) => {
  switch (action.type) {
    case SET_LOCATION_ACTION:
      return {latitude: action.latitude, longitude: action.longitude};
    default:
      return state;
  }
};
