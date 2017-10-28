import { connect } from 'react-redux';

import { GuideSection } from './guide_section';

import {
  getIsSandbox,
} from '../../store';

import {
  registerSection,
  unregisterSection,
} from '../../actions';

function mapStateToProps(state) {
  return {
    isSandbox: getIsSandbox(state),
  };
}

export const GuideSectionContainer = connect(
  mapStateToProps,
  {
    registerSection,
    unregisterSection,
  },
)(GuideSection);
