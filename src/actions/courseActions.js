import * as types from './actionTypes';

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course }; // in ES5 the Object declaration would look like { type: 'CREATE_COURSE', course: course }
}
