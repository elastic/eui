import { CommonProps } from '../../common';

import { FunctionComponent } from 'react';

declare module '@elastic/eui' {
  /**
   * MutationObserver type defs
   *
   * @see './mutation_observer.js'
   */
  export interface EuiMutationObserverProps {
    observerOptions: MutationObserverInit; // [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
    onMutation: MutationCallback;
  }

  export const EuiMutationObserver: FunctionComponent<
    CommonProps & EuiMutationObserverProps
  >;
}
