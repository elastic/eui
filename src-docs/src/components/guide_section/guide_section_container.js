import { connect } from 'react-redux';

import { GuideSection } from './guide_section';

import {
  getIsSandbox,
  getTheme,
} from '../../store';

import {
  toggleTheme,
} from '../../actions';

function mapStateToProps(state) {
  return {
    isSandbox: getIsSandbox(state),
    theme: getTheme(state),
  };
}

export const GuideSectionContainer = connect(
  mapStateToProps,
  {
    toggleTheme,
  },
)(GuideSection);
