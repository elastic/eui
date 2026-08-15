/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode, useEffect, useRef, useState } from 'react';

export interface EuiDelayHideProps {
  hide?: boolean;
  minimumDuration?: number;
  render: () => ReactNode;
}

function isComponentBecomingVisible(
  prevHide: boolean = false,
  nextHide: boolean = false
) {
  return prevHide === true && nextHide === false;
}

export const EuiDelayHide = ({
  hide = false,
  minimumDuration = 1000,
  render,
}: EuiDelayHideProps) => {
  const [countdownExpired, setCountdownExpired] = useState(hide);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const prevHide = useRef<boolean>();

  const finishCountdown = () => {
    timeoutId.current = undefined;
    setCountdownExpired(true);
  };

  const startCountdown = () => {
    // only start the countdown if there is not one in progress
    if (timeoutId.current == null) {
      timeoutId.current = setTimeout(
        finishCountdown,
        // even though `minimumDuration` cannot be undefined, passing a strict number type to setTimeout makes TS interpret
        // it as a NodeJS.Timer instead of a number. The DOM lib defines the setTimeout call as taking `number | undefined`
        // so we cast minimumDuration to this type instead to force TS's cooperation
        minimumDuration as number | undefined
      );
    }
  };

  useEffect(() => {
    const isFirstRender = prevHide.current === undefined;
    const isBecomingVisible = isComponentBecomingVisible(
      prevHide.current,
      hide
    );
    prevHide.current = hide;

    if (isBecomingVisible) {
      setCountdownExpired(false);
    }

    const shouldStartTimer =
      (isFirstRender && hide === false) || isBecomingVisible;
    if (shouldStartTimer) {
      startCountdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hide]);

  useEffect(() => {
    return () => {
      if (timeoutId.current != null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return hide === true && countdownExpired ? null : render();
};

EuiDelayHide.displayName = 'EuiDelayHide';
