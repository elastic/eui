import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ICON_TYPES, EuiIcon } from '../icon';

const sizeToClassNameMap = {
  xs: 'euiListGroupItem--xSmall',
  s: 'euiListGroupItem--small',
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
      'euiListGroupItem-active': isActive,
      'euiListGroupItem-disabled': isDisabled,
      'euiListGroupItem-hasIcon': iconType,
      'euiListGroupItem-hasAction': extraAction,
      'euiListGroupItem-textOnly': typeof label === 'string' && !href,
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
    extraActionNode = (
      <span className="euiListGroupItem__actionButton">
        {extraAction}
      </span>
    );
  }

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
        className="euiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {iconNode}
        {label}
      </button>
    );
  } else if (typeof label === 'object') {
    itemContent = label;
  } else {
    itemContent = (
      <span {...rest}>
        {iconNode}
        {label}
      </span>
    );
  }

  let labelNode;

  if (label) {
    labelNode = (
      <span className="euiListGroupItem__label">
        {itemContent}
      </span>
    );
  }

  const buttonContent = (
    <span className="euiListGroupItem__content">
      {labelNode}
      {extraActionNode}
    </span>
  );

  return (
    <li
      className={classes}
    >
      {buttonContent}
    </li>
  );
};

EuiListGroupItem.propTypes = {
  className: PropTypes.string,

  /**
   * Set the size of the label text. Defaul is medium
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
