import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ICON_TYPES, EuiIcon } from '../icon';

export const EuiListGroupItem = ({
  label,
  isActive,
  isDisabled,
  href,
  className,
  iconType,
  extraAction,
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'euiListGroupItem',
    {
      'euiListGroupItem-active': isActive,
      'euiListGroupItem-disabled': isDisabled,
      'euiListGroupItem-hasIcon': iconType,
      'euiListGroupItem-hasAction': extraAction,
    },
    className
  );

  let iconNode;

  if (iconType) {
    iconNode = (
      <EuiIcon type={iconType} />
    );
  }

  let labelNode;

  if (label) {
    labelNode = (
      <span className="euiListGroupItem__actionLabel">
        {label}
      </span>
    );
  }

  let extraActionNode;

  if (extraAction) {
    extraActionNode = (
      <span className="euiListGroupItem__actionButton">
        {extraAction}
      </span>
    );
  }

  const buttonContent = (
    <span className="euiListGroupItem__actionContent">
      {iconNode}
      {labelNode}
      {extraActionNode}
    </span>
  );

  // Handle the variety of content that can be passed to the label prop
  // This could include a basic link, other EUI components, a secondary button,
  // or plain text with an optional icon
  let itemContent;

  if (href && !isDisabled) {
    itemContent = (
      <a href={href} className="euiListGroupItem__button" {...rest}>
        {iconNode}
        {label}
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {iconNode}
        {label}
      </button>
    );
  } else if (typeof label === 'object' && !extraAction) {
    itemContent = label;
  } else if (extraAction) {
    itemContent = buttonContent;
  } else {
    itemContent = (
      <span {...rest}>
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </span>
    );
  }

  return (
    <li
      className={classes}
    >
      {itemContent}
    </li>
  );
};

EuiListGroupItem.propTypes = {
  className: PropTypes.string,

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
   * See EuiIcon
   */
  iconType: PropTypes.oneOf(ICON_TYPES),

  /**
   * Add button icon for secondary action. See EuiButtonIcon
   */
  extraAction: PropTypes.node,

  onClick: PropTypes.func,
};

EuiListGroupItem.defaultProps = {
  isActive: false,
  isDisabled: false,
};
