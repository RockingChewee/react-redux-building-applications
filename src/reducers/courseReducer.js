import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) { // this slice of 'state' will be an array of courses
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      // Since State is immutable, we can't simply change the appropriate index in the array, but we need to re-create the array instead.
      // To achieve this we pick all the 'state' array elements via spread operator (...), add a new element to the end and return a new array.
      return [
        ...state,
        Object.assign({}, action.course)
      ];
    case types.UPDATE_COURSE_SUCCESS:
      // In addition, here we first filter out the course that is updated and then add the new version of it to the end of the new array.
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];
    default:
      return state;
  }
}
