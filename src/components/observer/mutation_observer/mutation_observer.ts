import { ReactNode } from 'react';

import { EuiObserver } from '../observer';

interface Props {
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onMutation: MutationCallback;
  observerOptions?: MutationObserverInit;
}

export class EuiMutationObserver extends EuiObserver<Props> {
  name = 'EuiMutationObserver';

  // the `onMutation` prop may change while the observer is bound, abstracting
  // it out into a separate function means the current `onMutation` value is used
  onMutation: MutationCallback = (records, observer) => {
    this.props.onMutation(records, observer);
  };

  beginObserve = () => {
    // IE11 and the MutationObserver polyfill used in Kibana (for Jest) implement
    // an older spec in which specifying `attributeOldValue` or `attributeFilter`
    // without specifying `attributes` results in a `SyntaxError`.
    // The following logic patches the newer spec in which `attributes: true` can be
    // implied when appropriate (`attributeOldValue` or `attributeFilter` is specified).
    const observerOptions: MutationObserverInit = {
      ...this.props.observerOptions,
    };
    const needsAttributes =
      observerOptions.hasOwnProperty('attributeOldValue') ||
      observerOptions.hasOwnProperty('attributeFilter');
    if (needsAttributes && !observerOptions.hasOwnProperty('attributes')) {
      observerOptions.attributes = true;
    }

    this.observer = new MutationObserver(this.onMutation);
    this.observer.observe(this.childNode!, observerOptions);
  };
}
