/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode, useEffect, useState } from 'react';

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
  const [prevHide, setPrevHide] = useState(hide);

  if (hide !== prevHide) {
    setPrevHide(hide);
    if (isComponentBecomingVisible(prevHide, hide)) {
      setCountdownExpired(false);
    }
  }

  useEffect(() => {
    if (countdownExpired === false) {
      const timeoutId = window.setTimeout(
        () => setCountdownExpired(true),
        minimumDuration
      );
      return () => window.clearTimeout(timeoutId);
    }
  }, [countdownExpired, minimumDuration]);

  return hide === true && countdownExpired ? null : render();
};

EuiDelayHide.displayName = 'EuiDelayHide';
