import { connect } from 'react-redux';

import { AppView } from './app_view';

import {
  getTheme,
  getRoutes,
} from '../store';

import {
  toggleTheme,
} from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    currentRoute: ownProps.routes[1],
    theme: getTheme(state),
    routes: getRoutes(state),
  };
}

export const AppContainer = connect(
  mapStateToProps,
  {
    toggleTheme,
  },
)(AppView);

