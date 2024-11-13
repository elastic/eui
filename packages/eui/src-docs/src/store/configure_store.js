import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import Routes from '../routes';

/**
 * @param {Object} initialState An object defining the application's initial
 * state.
 */
export default function configureStore(initialState) {
  function rootReducer() {
    return {
      routes: Routes,
    };
  }

  return compose(applyMiddleware(thunk))(createStore)(
    rootReducer,
    initialState
  );
}
