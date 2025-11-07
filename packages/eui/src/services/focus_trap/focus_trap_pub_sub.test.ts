/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { focusTrapPubSub } from './focus_trap_pub_sub';

describe('focusTrapPubSub', () => {
  let unsubscribeAll: Array<() => void> = [];

  afterEach(() => {
    unsubscribeAll.forEach((unsubscribe) => unsubscribe());
    unsubscribeAll = [];
  });

  it('subscribes a listener and calls it on publish', () => {
    const listener = jest.fn();

    unsubscribeAll.push(focusTrapPubSub.subscribe(listener));
    focusTrapPubSub.publish();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('does not call the listener after it has been unsubscribed', () => {
    const listener = jest.fn();
    const unsubscribe = focusTrapPubSub.subscribe(listener);

    unsubscribe();
    focusTrapPubSub.publish();

    expect(listener).not.toHaveBeenCalled();
  });

  it('can handle multiple subscribers and unsubscribes them independently', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    const unsubscribe1 = focusTrapPubSub.subscribe(listener1);

    unsubscribeAll.push(focusTrapPubSub.subscribe(listener2));
    focusTrapPubSub.publish();

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    unsubscribe1();
    focusTrapPubSub.publish();

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});
