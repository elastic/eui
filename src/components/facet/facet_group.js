import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFlexGroup } from '../flex';

const layoutToClassNameMap = {
  vertical: 'euiFacetGroup--vertical',
  horizontal: 'euiFacetGroup--horizontal',
};

export const LAYOUTS = Object.keys(layoutToClassNameMap);

export const EuiFacetGroup = ({ children, className, layout, ...rest }) => {
  const classes = classNames(
    'euiFacetGroup',
    layoutToClassNameMap[layout],
    className
  );
  const direction = layout === 'vertical' ? 'column' : 'row';
  const wrap = layout === 'vertical' ? false : true;

  return (
    <EuiFlexGroup
      className={classes}
      direction={direction}
      wrap={wrap}
      gutterSize="none"
      {...rest}>
      {children}
    </EuiFlexGroup>
  );
};

EuiFacetGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.oneOf(LAYOUTS),
};

EuiFacetGroup.defaultProps = {
  layout: 'vertical',
};
