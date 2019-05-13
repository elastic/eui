import { connect } from 'react-redux';

import { AppView } from './app_view';

import { getTheme, getRoutes, getLocale } from '../store';

import { toggleTheme, toggleLocale } from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    currentRoute: ownProps.routes[1],
    theme: getTheme(state),
    locale: getLocale(state),
    routes: getRoutes(state),
  };
}

export const AppContainer = connect(
  mapStateToProps,
  {
    toggleTheme,
    toggleLocale,
  }
)(AppView);
