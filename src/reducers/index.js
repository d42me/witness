import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import ReportReducer from './ReportReducer';

export default combineReducers({
  form: FormReducer,
  report: ReportReducer
});
