import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiFlexGroup--gutterExtraSmall',
  s: 'euiFlexGroup--gutterSmall',
  m: 'euiFlexGroup--gutterMedium',
  l: 'euiFlexGroup--gutterLarge',
  xl: 'euiFlexGroup--gutterExtraLarge',
};

export const GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

const alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiFlexGroup--alignItemsFlexStart',
  flexEnd: 'euiFlexGroup--alignItemsFlexEnd',
  center: 'euiFlexGroup--alignItemsCenter',
  baseline: 'euiFlexGroup--alignItemsBaseline',
};

export const ALIGN_ITEMS = Object.keys(alignItemsToClassNameMap);

const justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'euiFlexGroup--justifyContentFlexEnd',
  center: 'euiFlexGroup--justifyContentCenter',
  spaceBetween: 'euiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'euiFlexGroup--justifyContentSpaceAround',
  spaceEvenly: 'euiFlexGroup--justifyContentSpaceEvenly',
};

export const JUSTIFY_CONTENTS = Object.keys(justifyContentToClassNameMap);

const directionToClassNameMap = {
  row: 'euiFlexGroup--directionRow',
  rowReverse: 'euiFlexGroup--directionRowReverse',
  column: 'euiFlexGroup--directionColumn',
  columnReverse: 'euiFlexGroup--directionColumnReverse',
};

export const DIRECTIONS = Object.keys(directionToClassNameMap);

export const EuiFlexGroup = ({
  children,
  className,
  gutterSize,
  alignItems,
  responsive,
  justifyContent,
  direction,
  wrap,
  component: Component,
  ...rest,
}) => {
  const classes = classNames(
    'euiFlexGroup',
    gutterSizeToClassNameMap[gutterSize],
    alignItemsToClassNameMap[alignItems],
    justifyContentToClassNameMap[justifyContent],
    directionToClassNameMap[direction],
    {
      'euiFlexGroup--responsive': responsive,
      'euiFlexGroup--wrap': wrap,
    },
    className
  );

  return (
    <Component
      className={classes}
      {...rest}
    >
      {children}
    </Component>
  );
};

EuiFlexGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  responsive: PropTypes.bool,
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  justifyContent: PropTypes.oneOf(JUSTIFY_CONTENTS),
  direction: PropTypes.oneOf(DIRECTIONS),
  component: PropTypes.oneOf(['div', 'span']),
  wrap: PropTypes.bool,
};

EuiFlexGroup.defaultProps = {
  gutterSize: 'l',
  alignItems: 'stretch',
  responsive: true,
  justifyContent: 'flexStart',
  direction: 'row',
  component: 'div',
  wrap: false,
};
