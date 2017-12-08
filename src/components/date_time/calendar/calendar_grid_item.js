import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  COLORS,
  EuiTextColor,
} from './../../text/text_color';

export const EuiCalendarGridItem = ({
  children,
  className,
  color,
  ...rest
}) => {
  const classes = classNames('euiCalendarGridItem', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiTextColor color={color}>
        {children}
      </EuiTextColor>
    </div>
  );
};

EuiCalendarGridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
};
