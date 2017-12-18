import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiTitle,
  EuiFlexGrid,
  EuiHorizontalRule,
  EuiButtonEmpty,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from '../../../../components';

export const EuiCalendarMonthYearSelector = ({
  children,
  className,
  ...rest,
}) => {

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const gridItemMonths = (
    months.map((item, index) => {
      return (
        <EuiFlexItem
          key={index}
        >
          <EuiButtonEmpty color="text" size="s" className="euiCalendarMonthYearSelector__item">
            {item}
          </EuiButtonEmpty>
       </EuiFlexItem>
      );
    })
  );

  const years = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
  ];

  const gridItemYears = (
    years.map((item, index) => {
      return (
        <EuiFlexItem
          key={index}
        >
          <EuiButtonEmpty color="text" size="s" className="euiCalendarMonthYearSelector__item">
            {item}
          </EuiButtonEmpty>
       </EuiFlexItem>
      );
    })
  );

  const classes = classNames('euiCalendarMonthYearSelector', className);
  const menuClasses = classNames(
    'euiCalendarMonthYearSelector__menu',
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
      >
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
      <div className={menuClasses}>
        <EuiFlexGrid columns={4} gutterSize="none">
          {gridItemMonths}
        </EuiFlexGrid>
        <EuiHorizontalRule margin="xs" />
        <EuiFlexGrid columns={4} gutterSize="none">
          {gridItemYears}
        </EuiFlexGrid>
        <EuiHorizontalRule margin="xs" />
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
          <EuiFlexItem>
            <EuiTextColor color="subdued">
              <EuiText>
                <p>Select a month and year</p>
              </EuiText>
            </EuiTextColor>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty flush="right" size="s" iconType="check">
              Done
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </div>
  );
};

EuiCalendarMonthYearSelector.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
