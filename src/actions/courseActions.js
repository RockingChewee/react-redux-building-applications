import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // in ES5 the Object declaration would look like { type: types.LOAD_COURSES_SUCCESS, courses: courses }
}

// We're making an async call to an API, so we'll want to handle the promise and then dispatch an action when the promise is resolved.
export function loadCourses() {
    return function(dispatch) { // this wrapper funciton will exist in every one of our thunks
      return courseApi.getAllCourses().then(courses => { // getAllCourses() returns a promise
        dispatch(loadCoursesSuccess(courses));
      }).catch(error => {
        throw(error);
      });
    };
}
