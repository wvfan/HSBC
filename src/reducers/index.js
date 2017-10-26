import { combineReducers } from 'redux';

import system from './system';
import design from './design';

const rootReducer = combineReducers({
  system,
  design,
});

export default rootReducer;
