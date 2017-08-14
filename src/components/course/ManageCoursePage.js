import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Setting initial LOCAL (not Redux) state
    // Constructor specific: 'this' reference can be omitted; can change state directly, i.e. without calling this.setState()
    this.state = {
      course: Object.assign({}, this.props.course), // this.props.course are coming in from the component higher in hierarchy
      errors: {},
      saving: false // controls the Save button name and disabled status
    };

    // Need to change 'this' context of change handlers, as otherwise the 'this' context
    // of an input element is picked, where this.state doesn't exist.
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // This lifecycle function is invoked each time the props are updated.
  // This way the course data still gets populated after the page refresh.
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) { // sometimes React doesn't know for sure whether props have changed, so it runs this method for safety
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  // A single change handler for all our form fields
  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course); // avoiding mutating the state
    course[field] = event.target.value;
    return this.setState({ course: course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({ saving: true });
    // In order to not redirect immediately, we use 'then' method to wait for the promise to complete first.
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        this.setState({ saving: false });
        toastr.error(error);
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved');
    // the this.context.router was pulled in by declaring static object ManageCoursePage.contextTypes
    this.context.router.push('/courses'); // an alternative to browserHistory.push("/courses");
  }

  render() {
    return (
      // Here 'authors' object is returned as a property via mapStateToProps().
      // this.state.course and this.state.errors are both part of the LOCAL component state and have nothing to do with Redux.
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router (used in saveCourse())
// 'context' is a global variable that library authors use, but we as library consumers should avoid.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) {
    return course[0]; // since filter returns an array, have to grab the first element
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps) { // 'ownProps' is a reference to our component's props

  // The Redux state is passed as an argument to this funciton and we can access it.

  const courseId = ownProps.params.id; // from the route path `/course/:id` at routes.js that the component itself has the access to (it is not in Redux)

  let course = { id: '', watchRef: '', title: '', authorId: '', length: '', category: '' };
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  // We have the this.state.authors set here (populated in index.js), but the shape isn't the one we need.
  // The SelectInput component accepts the data in value:text format, so we're formatting it here.
  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  // Here we are shaping the Redux store data to be available via props to this component.
  return {
    course: course,
    authors: authorsFormattedForDropdown // the Redux Store still contains the unformatted author list,
    // but the formatted one is passed down via props over to this component
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
