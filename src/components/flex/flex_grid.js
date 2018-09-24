import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const gutterSizeToClassNameMap = {
  none: null,
  s: 'euiFlexGrid--gutterSmall',
  m: 'euiFlexGrid--gutterMedium',
  l: 'euiFlexGrid--gutterLarge',
  xl: 'euiFlexGrid--gutterXLarge',
};

export const GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

const columnsToClassNameMap = {
  0: 'euiFlexGrid--wrap',
  1: 'euiFlexGrid--single',
  2: 'euiFlexGrid--halves',
  3: 'euiFlexGrid--thirds',
  4: 'euiFlexGrid--fourths',
};

export const COLUMNS = Object.keys(columnsToClassNameMap).map(columns => parseInt(columns, 10));

export const EuiFlexGrid = ({ children, className, gutterSize, responsive, columns, ...rest }) => {
  const classes = classNames(
    'euiFlexGrid',
    gutterSizeToClassNameMap[gutterSize],
    columnsToClassNameMap[columns],
    {
      'euiFlexGrid--responsive': responsive,
    },
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFlexGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  /**
   * Number of columns to show in the grid. Up to 4.
   */
  columns: PropTypes.oneOf(COLUMNS).isRequired,
  /**
   * Allow grid items display at block level on small screens
   */
  responsive: PropTypes.bool,
};

EuiFlexGrid.defaultProps = {
  gutterSize: 'l',
  columns: 0,
  responsive: true,
};

