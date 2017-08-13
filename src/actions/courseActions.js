import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // in ES5 the Object declaration would look like { type: types.LOAD_COURSES_SUCCESS, courses: courses }
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

// We're making an async call to an API, so we'll want to handle the promise returned by getAllCourses() and then dispatch an action when the promise is resolved.
export function loadCourses() { // this is our Thunk
    return function(dispatch) { // this wrapper funciton will exist in every one of our Thunks
      return courseApi.getAllCourses().then(courses => { // getAllCourses() returns a promise
        dispatch(loadCoursesSuccess(courses));
      }).catch(error => {
        throw(error);
      });
    };
}

export function saveCourse(course) {
  return function (dispatch, getState) { // The 'getState' is an optional parameter, which is useful when we need to access the Redux store to get the particular
                                         // pieces of state without the need of passing them in as parameters. We don't need it here, since we already have the
                                         // 'course' passed in (for getting the course.id), but this will become useful when the application grows bigger.
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      throw(error);
    });
  };
}
