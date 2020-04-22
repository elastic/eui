import { connect } from 'react-redux';

import { AppView } from './app_view';

import { getLocale } from '../store';

import { toggleLocale } from '../actions';

function mapStateToProps(state) {
  return {
    locale: getLocale(state),
  };
}

export const AppContainer = connect(
  mapStateToProps,
  {
    toggleLocale,
  }
)(AppView);
