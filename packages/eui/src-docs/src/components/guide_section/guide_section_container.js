import { connect } from 'react-redux';

import { GuideSection } from './guide_section';

import { getRoutes } from '../../store';

function mapStateToProps(state) {
  return {
    routes: getRoutes(state),
  };
}

export const GuideSectionContainer = connect(mapStateToProps)(GuideSection);
