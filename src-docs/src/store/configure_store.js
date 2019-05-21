import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

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
      routing: routerReducer(state.routing, action),
      theme: themeReducer(state.theme, action),
      locale: localeReducer(state.locale, action),
      routes: Routes,
    };
  }

  const finalStore = compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory))
  )(createStore)(rootReducer, initialState);

  return finalStore;
}
