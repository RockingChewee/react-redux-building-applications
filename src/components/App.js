// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        {/* These "children" (e.g. AboutPage, HomePage, etc.) will be passed over from the react-router
            to App component (in routes.js) and then they will be composed right here on the page. */}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    // 'ajaxCallsInProgress' is the property of state, but the derived value of 'loading' is passed down via props to this component onwards
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
