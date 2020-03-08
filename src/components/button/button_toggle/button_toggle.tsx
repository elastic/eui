import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

import { ToggleType } from '../../toggle';
import { EuiButton, EuiButtonProps } from '../button';

export interface EuiButtonToggleProps extends EuiButtonProps, CommonProps {
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
  label: ReactNode;

  /**
   * Classnames to add to `EuiToggle` instead of the `EuiButton`
   */
  toggleClassName?: string;

  /**
   * Is the button a single action or part of a group (multi)?
   * Used primarily for `EuiButtonGroup`
   */
  type?: ToggleType;

  onChange?: () => void;
  ariaOn?: string;
  ariaOff?: string;
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
  onChange = () => {},
  toggleClassName,
  type,
  value,
  'data-test-subj': dataTestSubj,
  ariaOff,
  ariaOn,
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

  const buttonContent = isIconOnly ? '' : label;

  return (
    <EuiButton
      tabIndex={-1} // prevents double focus from input to button
      className={classes}
      color={color}
      onClick={onChange}
      disabled={isDisabled}
      size={isIconOnly ? 's' : undefined} // only force small if it's the icon only version
      {...rest as Extract<
        EuiButtonTogglePropsForAnchor,
        EuiButtonTogglePropsForButtonToggle
      >}>
      {buttonContent}
    </EuiButton>
  );
};
