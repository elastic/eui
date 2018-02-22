import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  EuiTitle,
} from '../../../../src/components';

export const GuidePage = ({ children, title }) => {
  return (
    <Fragment>
      <EuiTitle size="l">
        <h1>{title}</h1>
      </EuiTitle>

      {children}
    </Fragment>
  );
};

GuidePage.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};
