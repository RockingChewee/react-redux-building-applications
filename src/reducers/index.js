import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses, // in ES5 this would look like courses: courses; by this name this reducer will be reachable, i.e. this.state.courses
  authors
});

export default rootReducer;
