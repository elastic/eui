/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, Ref, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiLoadingSpinner } from '../../loading';
import { EuiIcon, IconType } from '../../icon';

import { euiButtonDisplayContentStyles } from './_button_display_content.styles';

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
   * Object of props passed to the `<span>` wrapping the content's text/children only (not icon)
   *
   * This span wrapper can be removed by passing `textProps={false}`.
   */
  textProps?:
    | (HTMLAttributes<HTMLSpanElement> &
        CommonProps & {
          ref?: Ref<HTMLSpanElement>;
          'data-text'?: string;
        })
    | false;
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
  const styles = useEuiMemoizedStyles(euiButtonDisplayContentStyles);

  // Add an icon to the button if one exists.
  const icon = useMemo(() => {
    if (isLoading) {
      // When the button is disabled the text gets gray
      // and in some buttons the background gets a light gray
      // for better contrast we want to change the border of the spinner
      // to have the same color of the text. This way we ensure the borders
      // are always visible. The default spinner color could be very light.
      const loadingSpinnerColor = isDisabled
        ? { border: 'currentcolor' }
        : undefined;

      return <EuiLoadingSpinner size={iconSize} color={loadingSpinnerColor} />;
    }
    if (iconType) {
      return (
        <EuiIcon
          type={iconType}
          size={iconSize}
          color="inherit" // forces the icon to inherit its parent color
        />
      );
    }
  }, [iconType, iconSize, isLoading, isDisabled]);

  const isText = typeof children === 'string';
  const doNotRenderTextWrapper = textProps === false;
  const renderTextWrapper = (isText || textProps) && !doNotRenderTextWrapper;

  return (
    <span css={styles.euiButtonDisplayContent} {...contentProps}>
      {iconSide === 'left' && icon}
      {renderTextWrapper ? (
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
