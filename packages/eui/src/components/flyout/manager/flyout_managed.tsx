/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useId, useRef } from 'react';
import { css, keyframes } from '@emotion/react';
import {
  EuiFlyoutComponent,
  EuiFlyoutComponentProps,
} from '../flyout.component';
import {
  useFlyoutManager,
  useIsFlyoutActive,
  EuiManagedFlyoutContext,
} from './flyout_manager';
import { useEuiMemoizedStyles, UseEuiTheme } from '../../../services';
import { euiCanAnimate } from '../../../global_styling';
import { useResizeObserver } from '../../observer/resize_observer';

// Animation for moving flyout backwards in 3D space (z-axis) when inactive
const euiFlyoutSlideBack3D = keyframes`
  from {
    transform: translateZ(0) translateX(0) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  to {
    transform: translateZ(-500px) translateX(100%) scale(0.5);
    filter: blur(3px);
    opacity: 0.6;
  }
`;

// Animation for bringing flyout forward from 3D space when transitioning to active
const euiFlyoutSlideForward3D = keyframes`
  from {
    transform: translateZ(-500px) translateX(100%) scale(0.5);
    filter: blur(3px);
    opacity: 0.6;
  }
  to {
    transform: translateZ(0) translateX(0) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
`;

const euiManagedFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    managedFlyout: css`
      /* Base 3D context for all managed flyouts */
      perspective: 1000px;
      transform-style: preserve-3d;

      /* When flyout is inactive, animate backwards in 3D space */
      &[data-managed-flyout-active='false'] {
        ${euiCanAnimate} {
          animation: ${euiFlyoutSlideBack3D} ${euiTheme.animation.extraSlow}
            ${euiTheme.animation.resistance} forwards;
          pointer-events: none;
        }
      }

      /* When flyout is active, ensure it's on top and interactive */
      &[data-managed-flyout-active='true'] {
        z-index: ${parseInt(euiTheme.levels.flyout as string) + 1};
        pointer-events: auto;
      }
    `,
    // TODO: make this work eventually
    becomesActive: css`
      animation: ${euiFlyoutSlideForward3D} ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance} forwards;
    `,
  };
};

export interface EuiManagedFlyoutProps extends EuiFlyoutComponentProps {
  level: 'main' | 'child';
}

// The persistent component that renders in the provider
export const EuiManagedFlyout = ({
  id,
  onClose: onCloseProp,
  level,
  css: customCss,
  ...props
}: EuiManagedFlyoutProps) => {
  const defaultId = useId();
  const componentIdRef = useRef<string>(id || `persistent-${defaultId}`);
  const flyoutId = componentIdRef.current;
  const flyoutRef = useRef<HTMLDivElement>(null);

  const isActive = useIsFlyoutActive(flyoutId);
  const { addFlyout, closeFlyout, setFlyoutWidth } = useFlyoutManager();

  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);

  // Track width changes for main flyouts
  const { width } = useResizeObserver(
    level === 'main' && isActive ? flyoutRef.current : null,
    'width'
  );

  const onClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    onCloseProp(event);
    closeFlyout(flyoutId);
  };

  useEffect(() => {
    addFlyout(flyoutId, level);
    return () => {
      closeFlyout(flyoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update width in manager state when it changes
  useEffect(() => {
    if (level === 'main' && isActive && width) {
      setFlyoutWidth(flyoutId, width);
    }
  }, [flyoutId, level, isActive, width, setFlyoutWidth]);

  // TODO: need a variable to track if a child flyout is active

  // TODO: need a variable to track if the layout should be "side-by-side" or "stacked"

  return (
    <EuiManagedFlyoutContext.Provider value={true}>
      <EuiFlyoutComponent
        ref={flyoutRef}
        data-managed-flyout={true}
        data-managed-flyout-level={level}
        data-managed-flyout-active={isActive}
        id={componentIdRef.current}
        onClose={onClose}
        css={[styles.managedFlyout, customCss]}
        {...props}
      />
    </EuiManagedFlyoutContext.Provider>
  );
};
