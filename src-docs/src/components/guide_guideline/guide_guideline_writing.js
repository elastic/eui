import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiText,
} from '../../../../src/components';

export const GuideGuidelineWriting = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('GuidelineWriting', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiText><p>{children}</p></EuiText>
    </div>
  );
};

GuideGuidelineWriting.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
