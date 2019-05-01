import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiTitle } from '../../../../src/components';

export const GuideRuleTitle = ({ children, className, ...rest }) => {
  const classes = classNames('guideRule__title', className);

  return (
    <EuiTitle className={classes} {...rest}>
      <h2>{children}</h2>
    </EuiTitle>
  );
};

GuideRuleTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
