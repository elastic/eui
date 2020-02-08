import React, { AriaAttributes, Component } from 'react';
import classNames from 'classnames';

import { EuiBadge } from '../../badge';
import { EuiI18n } from '../../i18n';
import { EuiComboBoxOptionOption } from '..';

export interface EuiComboBoxPillProps<T> {
  asPlainText?: boolean;
  children?: string;
  className?: string;
  color?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickAriaLabel?: AriaAttributes['aria-label'];
  onClose?: (option: EuiComboBoxOptionOption<T>) => void;
  option: EuiComboBoxOptionOption<T>;
}

export class EuiComboBoxPill<T> extends Component<EuiComboBoxPillProps<T>> {
  static defaultProps = {
    color: 'hollow',
  };

  onCloseButtonClick = () => {
    const { onClose, option } = this.props;
    if (onClose) {
      onClose(option);
    }
  };

  render() {
    const {
      asPlainText,
      children,
      className,
      color,
      onClick,
      onClickAriaLabel,
      onClose, // eslint-disable-line no-unused-vars
      option, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const classes = classNames(
      'euiComboBoxPill',
      {
        'euiComboBoxPill--plainText': asPlainText,
      },
      className
    );

    if (onClose) {
      return (
        <EuiI18n
          token="euiComboBoxPill.removeSelection"
          default="Remove {children} from selection in this group"
          values={{ children }}>
          {(removeSelection: string) => (
            <EuiBadge
              className={classes}
              closeButtonProps={{ tabIndex: -1 }}
              color={color}
              iconOnClick={this.onCloseButtonClick}
              iconOnClickAriaLabel={removeSelection}
              iconSide="right"
              iconType="cross"
              onClick={onClick}
              onClickAriaLabel={onClickAriaLabel}
              title={children}
              {...rest}>
              {children}
            </EuiBadge>
          )}
        </EuiI18n>
      );
    }

    if (asPlainText) {
      return (
        <span className={classes} {...rest}>
          {children}
        </span>
      );
    }

    return (
      <EuiBadge
        className={classes}
        color={color}
        title={children}
        {...rest}
        onClick={onClick}
        onClickAriaLabel={onClickAriaLabel}>
        {children}
      </EuiBadge>
    );
  }
}
