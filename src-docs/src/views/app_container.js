import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppView } from './app_view';
import { getRoutes, getLocale } from '../store';

import { toggleLocale } from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    currentRoute: ownProps.currentRoute,
    locale: getLocale(state),
    routes: getRoutes(state),
    ...ownProps,
  };
}

export const AppContainer = withRouter(
  connect(
    mapStateToProps,
    {
      toggleLocale,
    }
  )(AppView)
);
