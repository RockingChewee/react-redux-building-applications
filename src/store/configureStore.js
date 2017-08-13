import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // enforces immutability
import thunk from 'redux-thunk'; // handles async API calls by using a wrapping the Action object into a funciton in src/actions/courseActions.js

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
