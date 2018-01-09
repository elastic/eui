import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiText,
} from '../../../../src/components';

export const GuideRuleWriting = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('guideRule__writing', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiText><p>{children}</p></EuiText>
    </div>
  );
};

GuideRuleWriting.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
