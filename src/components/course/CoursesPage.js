import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push("/course");
  }

  render() {
    const { courses } = this.props; // in ES5 this would look like as: var courses = this.props.courses;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses} /> {/* could pass {this.props.courses} also */}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses // the name 'courses' of state depends on how the courseReducer is referenced to in rootReducer, i.e. src/reducers/index.js
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// connect(mapStateToProps, mapDispatchToProps) returns a function, which is invoked with CoursesPage argument
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
