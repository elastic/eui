/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { useEuiTheme } from '../../services';

import {
  euiImageButtonStyles,
  euiImageButtonIconStyles,
} from './image_button.styles';
import { EuiIcon } from '../icon';
import type {
  EuiImageButtonProps,
  EuiImageButtonIconColor,
} from './image_types';

const fullScreenIconColorMap: {
  [color in EuiImageButtonIconColor]: string;
} = {
  light: 'ghost',
  dark: 'default',
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

  const buttonStyles = euiImageButtonStyles(euiTheme);

  const cssButtonStyles = [
    buttonStyles.euiImageButton,
    hasShadow ? buttonStyles.hasShadowHover : buttonStyles.shadowHover,
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
      {allowFullScreen && !isFullScreen && (
        <div css={cssIconStyles}>
          <EuiIcon type="fullScreen" color={iconColor} />
        </div>
      )}
    </button>
  );
};
