import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export const GuidePage = ({ children, title, intro }) => {
  return (
    <Fragment>
      <div className="guideSection__text">
        <EuiTitle size="l">
          <h1>{title}</h1>
        </EuiTitle>

        <EuiSpacer />
        {intro}
      </div>

      {children}
    </Fragment>
  );
};

GuidePage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  intro: PropTypes.node,
};
