import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppView } from './app_view';

import {
  getIsSandbox,
  getSections,
} from '../store';

import {
  registerSection,
  unregisterSection,
} from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    currentRouteName: ownProps.routes[1].name,
    isSandbox: getIsSandbox(state),
    sections: getSections(state),
  };
}

export const AppContainer = connect(
  mapStateToProps,
  {
    registerSection,
    unregisterSection,
  },
)(AppView);
