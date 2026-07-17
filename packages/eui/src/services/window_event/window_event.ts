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
  /**
   * The window event to listen for. Accepts any event name from TypeScript's [WindowEventMap](https://github.com/microsoft/TypeScript/blob/68cead182cc24afdc3f1ce7c8ff5853aba14b65a/lib/lib.dom.d.ts#L26898-L26906).
   */
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
