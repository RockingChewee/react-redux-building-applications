import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

// Additional imports for Thunk testing
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      //arrange
      const course = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      //act
      const action = courseActions.createCourseSuccess(course);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

// Testing Thunk

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {

  // Performs a cleanup after each of our tests is run.
  afterEach(() => {
    nock.cleanAll();
  });

  // Note that we pass a callback function called done() to Mocha, which invokes it when the async work is complete.
  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    // Here's an example call to nock. We don't need it for this test, since we're just using mock API here.
    // nock('http://example.com/')
    //   .get('/courses')
    //   .reply(200, { body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions, done);
    // The mock API is invoked here with the delay specified in src/api/delay.js
    store.dispatch(courseActions.loadCourses()).then(() => {
      // store.getActions() contains a history of processed actions?
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      // Callback passed in to this test to tell Mocha the async work is complete.
      done();
    });
  });
});
