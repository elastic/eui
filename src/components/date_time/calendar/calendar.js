import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCalendarGrid,
  EuiCalendarGridItem,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiSpacer,
} from '../../../components';

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

  const daysOfWeek = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];

  const gridItemDaysOfWeek = (
    daysOfWeek.map((day, index) => {
      return (
        <EuiCalendarGridItem
          color="subdued"
          key={index}
        >
          {day}
        </EuiCalendarGridItem>
      );
    })
  );

  const gridItemNumberedDays = (
    numberedDays.map((number, index) => {
      return <EuiCalendarGridItem key={index}>{number}</EuiCalendarGridItem>;
    })
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            size="s"
            color="text"
            iconType="arrowLeft"
            aria-label="Previous month"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div>
            <span className="euiCalendarMonth">December</span>
            <span className="euiCalendarYear"> 2017</span>
          </div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            size="s"
            color="text"
            iconType="arrowRight"
            aria-label="Next month"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="s" />
      <EuiCalendarGrid>
        {gridItemDaysOfWeek}
      </EuiCalendarGrid>
      <EuiCalendarGrid>
        {gridItemNumberedDays}
      </EuiCalendarGrid>
    </div>
  );
};

EuiCalendar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
