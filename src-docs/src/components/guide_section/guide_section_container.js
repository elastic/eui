import { connect } from 'react-redux';

import { GuideSection } from './guide_section';

import {
  getIsSandbox,
  getTheme,
  getRoutes,
} from '../../store';

import {
  toggleTheme,
} from '../../actions';

function mapStateToProps(state) {
  return {
    isSandbox: getIsSandbox(state),
    theme: getTheme(state),
    routes: getRoutes(state),
  };
}

export const GuideSectionContainer = connect(
  mapStateToProps,
  {
    toggleTheme,
  },
)(GuideSection);
