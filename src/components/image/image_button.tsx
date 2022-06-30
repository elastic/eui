/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';

import {
  euiImageButtonStyles,
  euiImageButtonIconStyles,
} from './image_button.styles';
import { EuiIcon } from '../icon';

export type EuiImageButtonIconColor = 'light' | 'dark';

const fullScreenIconColorMap: {
  [color in EuiImageButtonIconColor]: string;
} = {
  light: 'ghost',
  dark: 'default',
};

export type EuiImageButtonProps = CommonProps & {
  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
   * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
   */
  fullScreenIconColor?: EuiImageButtonIconColor;
  /**
   * Props to add to the wrapping `.euiImageFullscreenWrapper` figure
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  captionNode?: ReactNode;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  isFullScreen: boolean;
  isFullWidth: boolean;
  allowFullScreen: boolean | undefined;
};

export const EuiImageButton: FunctionComponent<EuiImageButtonProps> = ({
  hasShadow,
  children,
  onClick,
  onKeyDown,
  isFullScreen,
  isFullWidth,
  allowFullScreen,
  fullScreenIconColor = 'light',
  ...rest
}) => {
  const euiTheme = useEuiTheme();

  const buttonStyles = euiImageButtonStyles(euiTheme, hasShadow);

  const cssButtonStyles = [
    buttonStyles.euiImageButton,
    !isFullScreen && isFullWidth && buttonStyles.fullWidth,
  ];

  const iconStyles = euiImageButtonIconStyles(euiTheme);
  const cssIconStyles = [iconStyles.euiImageButton__icon];

  const iconColor =
    fullScreenIconColorMap[fullScreenIconColor as EuiImageButtonIconColor];

  return (
    <button
      type="button"
      css={cssButtonStyles}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
      {allowFullScreen && (
        <EuiIcon css={cssIconStyles} type="fullScreen" color={iconColor} />
      )}
    </button>
  );
};
