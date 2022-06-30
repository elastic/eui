/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import { CommonProps } from '../common';

import { EuiIcon } from '../icon';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { useEuiI18n } from '../i18n';
import { useEuiTheme } from '../../services';

import {
  euiImageFullscreenWrapperStyles,
  euiImageFullscreenWrapperFullScreenCloseIconStyles,
} from './image_fullscreen_wrapper.styles';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageFullscreenWrapperSize = typeof SIZES[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageFullscreenWrapperFloat = typeof FLOATS[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageFullscreenWrapperMargin = typeof MARGINS[number];

export type EuiImageFullscreenWrapperFullScreenIconColor = 'light' | 'dark';

export type EuiImageFullscreenWrapperProps = CommonProps & {
  /**
   * Separate from the caption is a title on the alt tag itself.
   * This one is required for accessibility.
   */
  alt: string;
  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * Props to add to the wrapping `.euiImageFullscreenWrapper` figure
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  captionNode?: ReactNode;
  buttonNode?: ReactNode;
  onClick: () => void;
};

export const EuiImageFullscreenWrapper: FunctionComponent<EuiImageFullscreenWrapperProps> = ({
  hasShadow,
  alt,
  wrapperProps,
  onClick,
  captionNode,
  buttonNode,
  ...rest
}) => {
  const euiTheme = useEuiTheme();

  const styles = euiImageFullscreenWrapperStyles(euiTheme);

  const cssStyles = [styles.euiImageFullscreenWrapper];

  const fullScreenCloseIconStyles = euiImageFullscreenWrapperFullScreenCloseIconStyles(
    euiTheme
  );
  const cssFullScreenCloseIconStyles = [
    fullScreenCloseIconStyles.euiImageFullscreenWrapper__fullScreenCloseIcon,
  ];

  return (
    <EuiOverlayMask data-test-subj="fullScreenOverlayMask" onClick={onClick}>
      <EuiFocusTrap clickOutsideDisables={true}>
        <>
          <figure
            {...wrapperProps}
            css={cssStyles}
            aria-label={rest['aria-label']}
          >
            {buttonNode}
            {captionNode}
          </figure>
          <EuiIcon
            type="fullScreenExit"
            color="default"
            css={cssFullScreenCloseIconStyles}
          />
        </>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
