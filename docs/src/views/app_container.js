import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppView } from './app_view';

import {
  getIsSandbox,
  getSections,
  getSource,
  getTitle,
} from '../store';

import {
  registerSection,
  unregisterSection,
  enterSandbox,
  exitSandbox,
} from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    isSandbox: getIsSandbox(state),
    source: getSource(state),
    title: getTitle(state),
    sections: getSections(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    registerSection,
    unregisterSection,
    enterSandbox,
    exitSandbox,
  };

  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
