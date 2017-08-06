// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        {/* These "children" (e.g. AboutPage, HomePage, etc.) will be passed over from the react-router
            to App component (in routes.js) and then they will be composed right here on the page. */}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
