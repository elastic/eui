/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { AriaAttributes, Component, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { EuiBadge } from '../../badge';
import { EuiI18n } from '../../i18n';
import { EuiComboBoxOptionOption, OptionHandler } from '../types';
import { CommonProps } from '../../common';

export interface EuiComboBoxPillProps<T> extends CommonProps {
  asPlainText?: boolean;
  children?: string;
  className?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickAriaLabel?: AriaAttributes['aria-label'];
  onClose?: OptionHandler<T>;
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
      onClose,
      option,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiComboBoxPill',
      {
        'euiComboBoxPill--plainText': asPlainText,
      },
      className
    );

    const onClickProps =
      onClick && onClickAriaLabel
        ? {
            onClick,
            onClickAriaLabel,
          }
        : {};

    const content = (
      <>
        {option.prepend && (
          <span className="euiComboBoxPill__prepend">{option.prepend}</span>
        )}
        {/* .euiBadge__text normally text truncates, but because we set it to flex to align prepend/append
          it breaks and we need to restore it manually
         */}
        <span className="eui-textTruncate">{children}</span>
        {option.append && (
          <span className="euiComboBoxPill__append">{option.append}</span>
        )}
      </>
    );

    if (onClose) {
      return (
        <EuiI18n
          token="euiComboBoxPill.removeSelection"
          default="Remove {children} from selection in this group"
          values={{ children }}
        >
          {(removeSelection: string) => (
            <EuiBadge
              className={classes}
              color={color}
              data-test-subj="euiComboBoxPill"
              iconOnClick={this.onCloseButtonClick}
              iconOnClickAriaLabel={removeSelection}
              iconSide="right"
              iconType="cross"
              title={children}
              {...onClickProps}
              {...rest}
            >
              {content}
            </EuiBadge>
          )}
        </EuiI18n>
      );
    }

    if (asPlainText) {
      return (
        <span className={classes} data-test-subj="euiComboBoxPill" {...rest}>
          {content}
        </span>
      );
    }

    return (
      <EuiBadge
        className={classes}
        color={color}
        data-test-subj="euiComboBoxPill"
        title={children}
        {...rest}
        {...onClickProps}
      >
        {content}
      </EuiBadge>
    );
  }
}
