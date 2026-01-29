/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef } from 'react';
import { useEuiTheme } from '../../../services';
import { EuiManagedFlyout, type EuiManagedFlyoutProps } from './flyout_managed';
import {
  useCurrentMainFlyout,
  useFlyoutLayoutMode,
  useFlyoutWidth,
} from './hooks';
import {
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  LEVEL_CHILD,
} from './const';
import { DEFAULT_SIDE } from '../const';

/**
 * Props for `EuiFlyoutChild`, a managed child flyout that pairs with a main flyout.
 *
 * Notes:
 * - `type`, `side`, and `level` are fixed by the component and thus omitted.
 */
export type EuiFlyoutChildProps = Omit<
  EuiManagedFlyoutProps,
  | 'closeButtonPosition'
  | 'hideCloseButton'
  | 'type'
  | 'level'
  | 'hasChildBackground'
>;

/**
 * Managed child flyout that renders alongside or stacked over the main flyout,
 * depending on the current layout mode. Handles required managed flyout props.
 */
export const EuiFlyoutChild = forwardRef<HTMLElement, EuiFlyoutChildProps>(
  ({ css: customCss, side = DEFAULT_SIDE, ...props }, ref) => {
    const { euiTheme } = useEuiTheme();
    const mainFlyout = useCurrentMainFlyout();
    const mainWidth = useFlyoutWidth(mainFlyout?.flyoutId);
    const layoutMode = useFlyoutLayoutMode();

    // Runtime validation: prevent orphan child flyouts
    if (!mainFlyout) {
      const errorMessage =
        'EuiFlyoutChild must be used with an EuiFlyoutMain. ' +
        'This usually means the main flyout was not rendered before the child flyout.';

      // In development, throw an error to catch the issue early
      if (process.env.NODE_ENV === 'development') {
        throw new Error(errorMessage);
      }

      // In production, log a warning and prevent rendering
      console.error('EuiFlyoutChild validation failed:', errorMessage);
      return null;
    }

    let style: React.CSSProperties = {};
    if (mainWidth && layoutMode === LAYOUT_MODE_SIDE_BY_SIDE) {
      // Include --euiFlyoutOffsetInlineEnd CSS variable to account for viewport constraints (e.g., sidebar)
      // This positions the child flyout at: mainWidth + offsetVariable
      style = {
        [side]: `calc(${mainWidth}px + var(--euiFlyoutOffsetInlineEnd, 0px))`,
      };
    } else if (layoutMode === LAYOUT_MODE_STACKED) {
      style = { zIndex: Number(euiTheme.levels.flyout) + 2 };
    }

    return (
      <EuiManagedFlyout
        {...props}
        ref={ref}
        style={style}
        level={LEVEL_CHILD}
        type="overlay"
        ownFocus={false}
        side={side}
        css={customCss}
      />
    );
  }
);

EuiFlyoutChild.displayName = 'EuiFlyoutChild';
