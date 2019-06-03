import { SFC } from 'react';
import { Props as ReactFocusLockProps } from 'react-focus-lock'; // eslint-disable-line import/named
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  /**
   * A DOM node, a selector string (which will be passed to
   * `document.querySelector()` to find the DOM node), or a function that
   * returns a DOM node.
   */
  export type FocusTarget = HTMLElement | string | { (): HTMLElement };
  /**
   * FocusTrap type defs
   *
   * @see './focus_trap.js'
   */
  interface EuiFocusTrapProps {
    clickOutsideDisables?: boolean;
    initialFocus?: FocusTarget;
  }

  export const EuiFocusTrap: SFC<
    CommonProps & ReactFocusLockProps & EuiFocusTrapProps
  >;
}
