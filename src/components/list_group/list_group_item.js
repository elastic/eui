import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonIcon } from '../button';
import { ICON_TYPES, EuiIcon } from '../icon';

const sizeToClassNameMap = {
  xs: 'euiListGroupItem--xSmall',
  s: 'euiListGroupItem--small',
  m: 'euiListGroupItem--medium',
  l: 'euiListGroupItem--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiListGroupItem = ({
  label,
  isActive,
  isDisabled,
  href,
  className,
  iconType,
  extraAction,
  onClick,
  size,
  ...rest
}) => {
  const classes = classNames(
    'euiListGroupItem',
    sizeToClassNameMap[size],
    {
      'euiListGroupItem-isActive': isActive,
      'euiListGroupItem-isDisabled': isDisabled,
      'euiListGroupItem-isClickable': href || onClick,
    },
    className
  );

  let iconNode;

  if (iconType) {
    iconNode = (
      <EuiIcon className="euiListGroupItem__icon" type={iconType} />
    );
  }

  let extraActionNode;

  if (extraAction) {
    const {
      iconType,
      alwaysShow,
      ...rest
    } = extraAction;

    const extraActionClasses = classNames(
      'euiListGroupItem__extraAction',
      { 'euiListGroupItem__extraAction-alwaysShow': alwaysShow }
    );

    extraActionNode = (
      <span className={extraActionClasses}>
        <EuiButtonIcon className="euiListGroupItem__extraActionButton" iconType={iconType} {...rest} disabled={isDisabled} />
      </span>
    );
  }

  // Handle the variety of interaction behavior
  let itemContent;

  if (href && !isDisabled) {
    itemContent = (
      <a href={href} className="euiListGroupItem__button" {...rest}>
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        className="euiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </button>
    );
  } else {
    itemContent = (
      <span className="euiListGroupItem__text" {...rest}>
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </span>
    );
  }

  return (
    <li className={classes}>
      {itemContent}
      {extraActionNode}
    </li>
  );
};

EuiListGroupItem.propTypes = {
  className: PropTypes.string,

  /**
   * Set the size of the label text
   */
  size: PropTypes.oneOf(SIZES),

  /**
   * Content to be displyed in the list item
   */
  label: PropTypes.node.isRequired,

  /**
   * Apply styles indicating an item is active
   */
  isActive: PropTypes.bool,

  /**
   * Apply styles indicating an item is disabled
   */
  isDisabled: PropTypes.bool,

  /**
   * Make the list item label a link
   */
  href: PropTypes.string,

  /**
   * See `EuiIcon`
   */
  iconType: PropTypes.oneOf(ICON_TYPES),

  /**
   * Adds an `EuiButtonIcon` to the right side of the item; `iconType` is required;
   * pass `alwaysShow` if you don't want the default behavior of only showing on hover
   */
  extraAction: PropTypes.shape({
    iconType: PropTypes.oneOf(ICON_TYPES).isRequired,
    alwaysShow: PropTypes.bool,
  }),

  onClick: PropTypes.func,
};

EuiListGroupItem.defaultProps = {
  isActive: false,
  isDisabled: false,
  size: 'm',
};
