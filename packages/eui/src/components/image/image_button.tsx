/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiIcon } from '../icon';
import { EuiScreenReaderOnly } from '../accessibility';

import {
  euiImageButtonStyles,
  euiImageButtonIconStyles,
} from './image_button.styles';
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
  hasAlt,
  hasShadow,
  children,
  onClick,
  onKeyDown,
  isFullScreen,
  isFullWidth,
  fullScreenIconColor = 'light',
  ...rest
}) => {
  const buttonStyles = useEuiMemoizedStyles(euiImageButtonStyles);

  const cssButtonStyles = [
    buttonStyles.euiImageButton,
    hasShadow ? buttonStyles.hasShadowHover : buttonStyles.shadowHover,
    !isFullScreen && isFullWidth && buttonStyles.fullWidth,
  ];

  const iconStyles = useEuiMemoizedStyles(euiImageButtonIconStyles);
  const cssIconStyles = [
    iconStyles.euiImageButton__icon,
    iconStyles.openFullScreen,
  ];

  const openFullScreenInstructions = useEuiI18n(
    'euiImageButton.openFullScreen',
    'Click to open this image in fullscreen mode'
  );
  const closeFullScreenInstructions = useEuiI18n(
    'euiImageButton.closeFullScreen',
    'Press Escape or click to close image fullscreen mode'
  );

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
      {isFullScreen && (
        // In fullscreen mode, instructions should come first to allow screen reader
        // users to quickly exit vs. potentially reading out long/unskippable alt text
        <EuiScreenReaderOnly>
          <p>
            {closeFullScreenInstructions}
            {hasAlt && ' — '}
          </p>
        </EuiScreenReaderOnly>
      )}

      {children}

      {!isFullScreen && (
        <div css={cssIconStyles}>
          <EuiScreenReaderOnly>
            <p>
              {hasAlt && ' — '}
              {openFullScreenInstructions}
            </p>
          </EuiScreenReaderOnly>
          <EuiIcon type="fullScreen" color={iconColor} />
        </div>
      )}
    </button>
  );
};
