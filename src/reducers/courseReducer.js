import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) { // this slice of 'state' will be an array of courses
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
