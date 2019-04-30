import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiIcon, IconType, IconColor } from '../../icon';
import { OptionCheckedType } from '../types';

function resolveIconAndColor(
  checked: OptionCheckedType
): { icon: IconType; color?: IconColor } {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? { icon: 'check', color: 'text' }
    : { icon: 'cross', color: 'text' };
}

export type EuiSelectableListItemProps = ButtonHTMLAttributes<
  HTMLButtonElement
> &
  CommonProps & {
    children?: React.ReactNode;
    /**
     * Applies an icon and visual styling to activated items
     */
    checked?: OptionCheckedType;
    /**
     * Shows icons based on `checked` type
     */
    showIcons: boolean;
    /**
     * Highlights the item for pseudo focus
     */
    isFocused?: boolean;
    disabled?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
  };

const EuiSelectableListItem: FunctionComponent<
  EuiSelectableListItemProps
> = props => {
  const {
    children,
    className,
    disabled,
    checked,
    isFocused,
    showIcons = true,
    prepend,
    append,
    ...rest
  } = props;

  const classes = classNames(
    'euiSelectableListItem',
    {
      'euiSelectableListItem-isFocused': isFocused,
    },
    className
  );

  let buttonIcon: React.ReactNode;
  if (showIcons) {
    const { icon, color } = resolveIconAndColor(checked);
    buttonIcon = (
      <EuiIcon
        className="euiSelectableListItem__icon"
        color={color}
        type={icon}
      />
    );
  }

  let prependNode: React.ReactNode;
  if (prepend) {
    prependNode = (
      <span className="euiSelectableListItem__prepend">{prepend}</span>
    );
  }

  let appendNode: React.ReactNode;
  if (append) {
    appendNode = (
      <span className="euiSelectableListItem__append">{append}</span>
    );
  }

  return (
    <button
      role="option"
      type="button"
      aria-selected={isFocused}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}>
      <span className="euiSelectableListItem__content">
        {buttonIcon}
        {prependNode}
        <span className="euiSelectableListItem__text">{children}</span>
        {appendNode}
      </span>
    </button>
  );
};

export default EuiSelectableListItem;
