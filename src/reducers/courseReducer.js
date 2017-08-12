import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) { // this slice of 'state' will be an array of courses
  switch (action.type) {
    case types.CREATE_COURSE:
      // all the 'state' array elements are picked and defined here inline, which returns a new instance of 'state' array
      // and a new array element is added to the end
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
}
