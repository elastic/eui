import { connect } from 'react-redux';

import { AppView } from './app_view';

import { getRoutes, getLocale } from '../store';

import { toggleLocale } from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    currentRoute: ownProps.routes[1],
    locale: getLocale(state),
    routes: getRoutes(state),
  };
}

export const AppContainer = connect(
  mapStateToProps,
  {
    toggleLocale,
  }
)(AppView);
