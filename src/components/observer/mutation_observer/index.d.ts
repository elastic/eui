import { CommonProps } from '../../common';

import { SFC } from 'react';

declare module '@elastic/eui' {

  /**
   * MutationObserver type defs
   *
   * @see './mutation_observer.js'
   */
  export interface EuiMutationObserverProps {
    observerOptions: MutationObserverInit, // [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
    onMutation: () => void
  }

  export const EuiMutationObserver: SFC<
    CommonProps & EuiMutationObserverProps
    >;
}
