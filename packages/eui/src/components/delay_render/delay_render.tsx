/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

export interface EuiDelayRenderProps extends PropsWithChildren {
  delay?: number;
}

export const EuiDelayRender: FunctionComponent<EuiDelayRenderProps> = ({
  delay = 500,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [prevProps, setPrevProps] = useState({ children, delay });

  // Hiding must happen during the render phase: waiting for an effect would
  // briefly commit updated children before hiding them again, flashing the
  // content and triggering any aria-live announcements it may contain
  if (children !== prevProps.children || delay !== prevProps.delay) {
    setPrevProps({ children, delay });
    setShouldRender(false);
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShouldRender(true), delay);
    return () => window.clearTimeout(timeoutId);
  }, [children, delay]);

  return shouldRender ? children : null;
};
