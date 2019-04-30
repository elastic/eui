import { connect } from 'react-redux';

import { GuideSection } from './guide_section';

import { getTheme, getRoutes } from '../../store';

import { toggleTheme } from '../../actions';

function mapStateToProps(state) {
  return {
    theme: getTheme(state),
    routes: getRoutes(state),
  };
}

export const GuideSectionContainer = connect(
  mapStateToProps,
  {
    toggleTheme,
  }
)(GuideSection);
