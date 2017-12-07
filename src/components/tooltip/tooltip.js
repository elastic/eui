import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sizeToClassNameMap = {
  auto: null,
  s: 'euiTooltip--small',
  m: 'euiTooltip--medium',
  l: 'euiTooltip--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const Tooltip = ({
  children,
  className,
  size,
  isVisible,
  isSticky,
  title,
  ...rest
}) => {

  const classes = classNames(
    'euiTooltip__container',
    sizeToClassNameMap[size],
    {
      'euiTooltip-isVisible': isVisible,
      'euiTooltip-isHidden': !isVisible,
      'euiTooltip-isSticky': isSticky,
    },
    className
  );

  let tooltipTitle;
  if (title) {
    tooltipTitle = (
      <div className="euiTooltip__title">{title}</div>
    );
  }

  return (
    <div className={classes} {...rest}>
      <div className="euiTooltip__content">
        {tooltipTitle}
        {children}
      </div>
    </div>
  );

};

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  isVisible: PropTypes.bool,
  isSticky: PropTypes.bool,
  title: PropTypes.string
};

Tooltip.defaultProps = {
  size: 'auto',
  isVisible: true,
  isSticky: false
};
