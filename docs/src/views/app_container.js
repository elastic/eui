import { connect } from 'react-redux';

import { AppView } from './app_view';

import {
  getIsSandbox,
  getSections,
  getTheme,
} from '../store';

import {
  registerSection,
  unregisterSection,
  toggleTheme,
} from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    currentRouteName: ownProps.routes[1].name,
    isSandbox: getIsSandbox(state),
    sections: getSections(state),
    theme: getTheme(state),
  };
}

export const AppContainer = connect(
  mapStateToProps,
  {
    registerSection,
    unregisterSection,
    toggleTheme,
  },
)(AppView);

