/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useEuiTheme } from '../../../services';
import { CommonProps } from '../../common';
import { euiPopoverArrowStyles } from './_popover_arrow.styles';

export const POSITIONS = ['top', 'left', 'right', 'bottom'] as const;
export type EuiPopoverArrowPositions = (typeof POSITIONS)[number];

export type EuiPopoverArrowProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    position: EuiPopoverArrowPositions;
  };

export const EuiPopoverArrow: FunctionComponent<EuiPopoverArrowProps> = ({
  children,
  position,
  style,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiPopoverArrowStyles(euiTheme);
  const cssStyles = [styles.euiPopoverArrow, styles[position]];

  return (
    <div
      className="euiPopover__arrowWrapper"
      css={styles.euiPopoverArrowWrapper}
      style={style}
      {...rest}
    >
      <div
        className="euiPopover__arrow"
        data-popover-arrow={position}
        css={cssStyles}
      />
      {children}
    </div>
  );
};
