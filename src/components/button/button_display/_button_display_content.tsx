/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, Ref } from 'react';
import { useEuiTheme } from '../../../services';
import { CommonProps } from '../../common';
import { EuiLoadingSpinner } from '../../loading';
import { EuiIcon, IconType } from '../../icon';
import { euiButtonDisplayContentStyles } from './_button_display_content.styles';
import classNames from 'classnames';

export const ICON_SIZES = ['s', 'm'] as const;
export type ButtonContentIconSize = (typeof ICON_SIZES)[number];

export const ICON_SIDES = ['left', 'right'] as const;
export type ButtonContentIconSide = (typeof ICON_SIDES)[number] | undefined;

export type EuiButtonDisplayContentType = HTMLAttributes<HTMLSpanElement>;

/**
 * *INTERNAL ONLY*
 * This component is simply a helper component for reuse within other button components.
 */
export interface EuiButtonDisplayContentProps extends CommonProps {
  /**
   * Any `type` accepted by EuiIcon
   */
  iconType?: IconType;
  /**
   * Can only be one side `left` or `right`
   */
  iconSide?: ButtonContentIconSide;
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the content's text/children only (not icon)
   */
  textProps?: HTMLAttributes<HTMLSpanElement> &
    CommonProps & {
      ref?: Ref<HTMLSpanElement>;
      'data-text'?: string;
    };
  iconSize?: ButtonContentIconSize;
  isDisabled?: boolean;
}

export const EuiButtonDisplayContent: FunctionComponent<
  EuiButtonDisplayContentType & EuiButtonDisplayContentProps
> = ({
  children,
  textProps,
  isLoading = false,
  isDisabled = false,
  iconType,
  iconSize = 'm',
  iconSide = 'left',
  ...contentProps
}) => {
  const theme = useEuiTheme();
  const styles = euiButtonDisplayContentStyles(theme);

  const cssStyles = [styles.euiButtonDisplayContent];

  // Add an icon to the button if one exists.
  let icon;

  // When the button is disabled the text gets gray
  // and in some buttons the background gets a light gray
  // for better contrast we want to change the border of the spinner
  // to have the same color of the text. This way we ensure the borders
  // are always visible. The default spinner color could be very light.
  const loadingSpinnerColor = isDisabled
    ? { border: 'currentcolor' }
    : undefined;

  if (isLoading) {
    icon = <EuiLoadingSpinner size={iconSize} color={loadingSpinnerColor} />;
  } else if (iconType) {
    icon = (
      <EuiIcon
        type={iconType}
        size={iconSize}
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  const isText = typeof children === 'string';

  return (
    <span css={cssStyles} {...contentProps}>
      {iconSide === 'left' && icon}
      {isText || textProps ? (
        <span
          {...textProps}
          className={classNames('eui-textTruncate', textProps?.className)}
        >
          {children}
        </span>
      ) : (
        children
      )}
      {iconSide === 'right' && icon}
    </span>
  );
};
