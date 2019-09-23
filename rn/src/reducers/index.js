import { combineReducers } from 'redux'
import user from './user'
import location from './location'
import table from './table'

export default combineReducers({
  user,
  location,
  table
})
