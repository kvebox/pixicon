import { combineReducers } from 'redux';
import session from './session-api-reducer';
import errors from './errors-reducer';
import users from './users-reducer';
import doodles from './doodles_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  users,
  doodles
});

export default rootReducer;
