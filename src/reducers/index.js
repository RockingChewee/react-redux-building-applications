import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses, // in ES5 this would look like courses: courses; by this name this reducer will be reachable, i.e. this.state.courses
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
