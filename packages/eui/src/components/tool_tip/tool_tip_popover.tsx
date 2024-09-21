/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme, useEuiWindow } from '../../services';
import { euiToolTipStyles } from './tool_tip.styles';

export type ToolTipPositions = 'top' | 'right' | 'bottom' | 'left';

type Props = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    positionToolTip: () => void;
    children?: ReactNode;
    title?: ReactNode;
    popoverRef?: (ref: HTMLDivElement) => void;
    calculatedPosition?: ToolTipPositions;
  };

export const EuiToolTipPopover: FunctionComponent<Props> = ({
  children,
  title,
  className,
  positionToolTip,
  popoverRef,
  calculatedPosition,
  ...rest
}) => {
  const popover = useRef<HTMLDivElement>();

  const euiTheme = useEuiTheme();
  const currentWindow = useEuiWindow();
  const styles = euiToolTipStyles(euiTheme);
  const cssStyles = [
    styles.euiToolTip,
    calculatedPosition && styles[calculatedPosition],
  ];

  const updateDimensions = useCallback(() => {
    requestAnimationFrame(() => {
      // Because of this delay, sometimes `positionToolTip` becomes unavailable.
      if (popover.current) {
        positionToolTip();
      }
    });
  }, [positionToolTip]);

  const setPopoverRef = (ref: HTMLDivElement) => {
    if (popoverRef) {
      popoverRef(ref);
    }
  };

  useEffect(() => {
    (currentWindow?.document ?? document).body.classList.add(
      'euiBody-hasPortalContent'
    );
    (currentWindow ?? window).addEventListener('resize', updateDimensions);

    return () => {
      (currentWindow?.document ?? document).body.classList.remove(
        'euiBody-hasPortalContent'
      );
      (currentWindow ?? window).removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions, currentWindow]);

  const classes = classNames('euiToolTipPopover', className);

  return (
    <div
      css={cssStyles}
      className={classes}
      ref={setPopoverRef}
      data-position={calculatedPosition}
      {...rest}
    >
      {title && (
        <div css={styles.euiToolTip__title} className="euiToolTip__title">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};
