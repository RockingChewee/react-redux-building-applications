import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

  // Since all Reducers are invoked for all Actions - capturing each invocation here also and amending ajaxCallsInProgress property of the State
  // based on how the API call ended.
export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type) || action.type == types.AJAX_CALL_ERROR) {
    return state - 1;
  }

  return state;
}
