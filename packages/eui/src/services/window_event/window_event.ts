/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiWindowEvent } from './hooks';

type EventNames = keyof WindowEventMap;

interface Props<Ev extends EventNames> {
  event: Ev;
  handler: (this: Window, ev: WindowEventMap[Ev]) => any;
}

export const EuiWindowEvent = <E extends EventNames>({
  event,
  handler,
}: Props<E>) => {
  useEuiWindowEvent(event, handler);

  return null;
};
