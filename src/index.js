/* eslint-disable import/default */ // this way ESLint won't complain about us using a file that doesn't have a default export (src/store/configureStore.js)
import 'babel-polyfill'; // has to be included after {AppContainer} (or {Provider}?), otherwise - warnings in console
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

// If we wanted to rehydrate our store with some initial state passed down from the server, we could supply it to the configureStore()
const store = configureStore();
// Once the Store is configured, we can dispatch Actions against the Store
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
