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

type Props = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    positionToolTip: () => void;
    children?: ReactNode;
    title?: ReactNode;
    popoverRef?: (ref: HTMLDivElement) => void;
  };

export const EuiToolTipPopover: FunctionComponent<Props> = ({
  children,
  title,
  className,
  positionToolTip,
  popoverRef,
  ...rest
}) => {
  const popover = useRef<HTMLDivElement>();

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
    document.body.classList.add('euiBody-hasPortalContent');
    window.addEventListener('resize', updateDimensions);

    return () => {
      document.body.classList.remove('euiBody-hasPortalContent');
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = classNames('euiToolTipPopover', className);

  return (
    <div className={classes} ref={setPopoverRef} {...rest}>
      {title && <div className="euiToolTip__title">{title}</div>}
      {children}
    </div>
  );
};
