/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type Subscriber<TSubject> = (subject: TSubject) => void;

/**
 * @internal
 */
export type PublisherSubscribeFunc<TSubject> = (
  subscriber: Subscriber<TSubject>
) => () => void;

/**
 * @internal
 */
interface Publisher<TSubject> {
  subscribe: PublisherSubscribeFunc<TSubject>;
  unsubscribe: (subscriber: Subscriber<TSubject>) => void;
  notify: (subject: TSubject) => void;
}

/**
 * @internal
 */
export const createPublisher = <TSubject>(): Publisher<TSubject> => {
  const subscribers = new Set<Subscriber<TSubject>>();

  const unsubscribe = (subscriber: Subscriber<TSubject>) => {
    subscribers.delete(subscriber);
  };

  const subscribe = (subscriber: Subscriber<TSubject>) => {
    subscribers.add(subscriber);

    return () => unsubscribe(subscriber);
  };

  const notify = (subject: TSubject) => {
    for (const subscriber of subscribers) {
      subscriber(subject);
    }
  };

  return {
    subscribe,
    unsubscribe,
    notify,
  };
};
