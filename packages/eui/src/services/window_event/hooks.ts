/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef } from 'react';

type EuiEventHandler<EventName extends keyof WindowEventMap> = (
  this: Window,
  event: WindowEventMap[EventName]
) => any;

export const useEuiWindowEvent = <EventName extends keyof WindowEventMap>(
  event: EventName,
  handler: EuiEventHandler<EventName>
) => {
  const handlerRef = useRef<EuiEventHandler<EventName>>(handler);
  handlerRef.current = handler;

  const stableHandler = useCallback(function (
    this: Window,
    ev: WindowEventMap[EventName]
  ) {
    return handlerRef.current.call(this, ev);
  },
  []);

  useEffect(() => {
    window.addEventListener(event, stableHandler);
    return () => window.removeEventListener(event, stableHandler);
  }, [event, stableHandler]);

  return null;
};
