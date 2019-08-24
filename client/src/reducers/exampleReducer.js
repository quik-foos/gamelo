import {
  EXAMPLE_ACTION
} from '../actions/types'

export default (state = 0, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return state + action.num
    default:
      return state
  }
}