import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCalendarBox,
} from '..';

export const EuiCalendar = ({
  className,
  ...rest
}) => {
  const classes = classNames('euiCalendar', className);

  const numberedDays = [
    26, 27, 28, 29, 30, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31, 1, 2, 3, 4, 5, 6
  ];

  const boxes = (
    numberedDays.map((number, index) => {
      return <EuiCalendarBox key={index}>{number}</EuiCalendarBox>;
    })
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {boxes}
    </div>
  );
};

EuiCalendar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
