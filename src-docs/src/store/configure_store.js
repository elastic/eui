import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

import Routes from '../routes';

import localeReducer from './reducers/locale_reducer';
import themeReducer from './reducers/theme_reducer';

/**
 * @param {Object} initialState An object defining the application's initial
 * state.
 */
export default function configureStore(initialState) {
  function rootReducer(state = {}, action) {
    return {
      theme: themeReducer(state.theme, action),
      locale: localeReducer(state.locale, action),
      routes: Routes,
    };
  }

  // Use redux devtools provided compose function if enabled in the browser
  const composeFunc = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return composeFunc(applyMiddleware(thunk))(createStore)(
    rootReducer,
    initialState
  );
}
