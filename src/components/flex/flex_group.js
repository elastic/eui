import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const gutterSizeToClassNameMap = {
  none: null,
  s: 'euiFlexGroup--gutterSmall',
  m: 'euiFlexGroup--gutterMedium',
  l: 'euiFlexGroup--gutterLarge',
  xl: 'euiFlexGroup--gutterExtraLarge',
};

export const GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

const alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiFlexGroup--alignItemsStart',
  flexEnd: 'euiFlexGroup--alignItemsEnd',
  center: 'euiFlexGroup--alignItemsCenter',
};

export const ALIGN_ITEMS = Object.keys(alignItemsToClassNameMap);

const justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'euiFlexGroup--justifyContentFlexEnd',
  center: 'euiFlexGroup--justifyContentCenter',
  spaceBetween: 'euiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'euiFlexGroup--justifyContentSpaceAround',
};

export const JUSTIFY_CONTENTS = Object.keys(justifyContentToClassNameMap);

export const EuiFlexGroup = ({ children, className, gutterSize, alignItems, responsive, justifyContent, ...rest }) => {
  const classes = classNames(
    'euiFlexGroup',
    gutterSizeToClassNameMap[gutterSize],
    alignItemsToClassNameMap[alignItems],
    justifyContentToClassNameMap[justifyContent],
    {
      'euiFlexGroup--responsive': responsive,
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

EuiFlexGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  responsive: PropTypes.bool,
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  justifyContent: PropTypes.oneOf(JUSTIFY_CONTENTS),
};

EuiFlexGroup.defaultProps = {
  gutterSize: 'l',
  alignItems: 'stretch',
  responsive: true,
  justifyContent: 'flexStart',
};
