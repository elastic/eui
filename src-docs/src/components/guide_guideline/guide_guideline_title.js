import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiTitle,
} from '../../../../src/components';

export const GuideGuidelineTitle = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('GuidelineTitle', className);

  return (
    <EuiTitle
      className={classes}
      {...rest}
    >
      <h2>{children}</h2>
    </EuiTitle>
  );
};

GuideGuidelineTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
