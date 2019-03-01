import React, { Component, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';

const resolveIconAndColor = checked => {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? { icon: 'check', color: 'text' }
    : { icon: 'cross', color: 'text' };
};

export type EuiSelectableListItemProps = ButtonHTMLAttributes<
  HTMLButtonElement
> &
  CommonProps & {
    children?: React.ReactNode;
    /**
     * Applies an icon and visual styling to activated items
     */
    checked?: 'on' | 'off';
    /**
     * Shows icons based on `checked` type
     */
    showIcons: boolean;
    /**
     * Highlights the item for pseudo focus
     */
    isFocused?: boolean;
    disabled?: boolean;
  };

export class EuiSelectableListItem extends Component<
  EuiSelectableListItemProps
> {
  static defaultProps = {
    showIcons: true,
  };

  constructor(props: EuiSelectableListItemProps) {
    super(props);
    this.state = { hasFocus: false };
  }

  focus = () => {
    if (this.buttonRef) {
      this.buttonRef.focus();
    }
  };

  onFocus = () => {
    if (this.mounted) {
      this.setState({ hasFocus: true });
    }
  };

  onBlur = () => {
    if (this.mounted) {
      this.setState({ hasFocus: false });
    }
  };

  hasFocus = () => {
    return this.state.hasFocus;
  };

  render() {
    const {
      children,
      className,
      disabled,
      checked,
      isFocused,
      showIcons,
      ...rest
    } = this.props;

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

    return (
      <button
        ref={ref => (this.buttonRef = ref)}
        role="option"
        type="button"
        aria-selected={isFocused}
        className={classes}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}>
        <span className="euiSelectableListItem__content">
          {buttonIcon}
          <span className="euiSelectableListItem__text">{children}</span>
        </span>
      </button>
    );
  }
}
