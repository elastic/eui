import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { ExclusiveUnion, Omit } from '../../common';
import { EuiToggle, ToggleType } from '../../toggle';
import { EuiButton, EuiButtonProps } from '../button';

export interface EuiButtonToggleProps extends EuiButtonProps {
  /**
   * Simulates a `EuiButtonEmpty`
   */
  isEmpty?: boolean;

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly?: boolean;

  /**
   * Initial state of the toggle
   */
  isSelected?: boolean;

  /**
   * Button label, which is also passed to `EuiToggle` as the input's label
   */
  label: string;

  /**
   * Classnames to add to `EuiToggle` instead of the `EuiButton`
   */
  toggleClassName?: string;

  /**
   * Is the button a single action or part of a group (multi)?
   * Used primarily for `EuiButtonGroup`
   */
  type?: ToggleType;

  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type EuiButtonTogglePropsForAnchor = EuiButtonToggleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'name'> & {
    href?: string;
    name?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type EuiButtonTogglePropsForButtonToggle = EuiButtonToggleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'name'> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    name?: string;
    value?: string;
  };

type Props = ExclusiveUnion<
  EuiButtonTogglePropsForAnchor,
  EuiButtonTogglePropsForButtonToggle
>;

export const EuiButtonToggle: FunctionComponent<Props> = ({
  className,
  color = 'primary',
  isDisabled,
  isEmpty,
  isIconOnly,
  isSelected,
  label,
  name,
  onChange,
  toggleClassName,
  type,
  value,
  ...rest
}) => {
  const classes = classNames(
    'euiButtonToggle',
    {
      'euiButtonToggle--isIconOnly': isIconOnly,
      'euiButtonToggle--isEmpty': isEmpty,
    },
    className
  );

  const wrapperClasses = classNames(
    'euiButtonToggle__wrapper',
    {
      'euiButtonToggle--isDisabled': isDisabled,
    },
    toggleClassName
  );

  const buttonContent = isIconOnly ? '' : label;

  return (
    <EuiToggle
      className={wrapperClasses}
      inputClassName="euiButtonToggle__input"
      checked={isSelected}
      isDisabled={isDisabled}
      label={label}
      name={name}
      onChange={onChange}
      type={type}
      title={label}
      value={value}>
      <EuiButton
        tabIndex={-1} // prevents double focus from input to button
        className={classes}
        color={color}
        disabled={isDisabled}
        size={isIconOnly ? 's' : undefined} // only force small if it's the icon only version
        {...rest as Extract<
          EuiButtonTogglePropsForAnchor,
          EuiButtonTogglePropsForButtonToggle
        >}>
        {buttonContent}
      </EuiButton>
    </EuiToggle>
  );
};
