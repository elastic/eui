import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const gutterSizeToClassNameMap = {
  none: '',
  small: 'euiFlexGroup--gutterSmall',
  medium: 'euiFlexGroup--gutterMedium',
  large: 'euiFlexGroup--gutterLarge',
  extraLarge: 'euiFlexGroup--gutterExtraLarge',
};

export const GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

const alignItemsToClassNameMap = {
  stretch: '',
  flexStart: 'euiFlexGroup--alignItemsStart',
  flexEnd: 'euiFlexGroup--alignItemsEnd',
  center: 'euiFlexGroup--alignItemsCenter',
};

export const ALIGN_ITEMS = Object.keys(alignItemsToClassNameMap);

const justifyContentToClassNameMap = {
  flexStart: '',
  flexEnd: 'euiFlexGroup--justifyContentFlexEnd',
  center: 'euiFlexGroup--justifyContentCenter',
  spaceBetween: 'euiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'euiFlexGroup--justifyContentSpaceAround',
};

export const JUSTIFY_CONTENTS = Object.keys(justifyContentToClassNameMap);

export const EuiFlexGroup = ({ children, className, gutterSize, alignItems, justifyContent, ...rest }) => {
  const classes = classNames(
    'euiFlexGroup',
    gutterSizeToClassNameMap[gutterSize],
    alignItemsToClassNameMap[alignItems],
    justifyContentToClassNameMap[justifyContent],
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
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  justifyContent: PropTypes.oneOf(JUSTIFY_CONTENTS),
};

EuiFlexGroup.defaultProps = {
  gutterSize: 'large',
  alignItems: 'stretch',
  justifyContent: 'flexStart',
};
