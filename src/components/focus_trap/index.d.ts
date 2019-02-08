import { SFC } from 'react';
import { Props as ReactFocusLockProps } from 'react-focus-lock';
import { CommonProps } from '../common';
/**
 * A DOM node, a selector string (which will be passed to
 * `document.querySelector()` to find the DOM node), or a function that
 * returns a DOM node.
 */
export type FocusTarget = HTMLElement | string | { (): HTMLElement };

declare module '@elastic/eui' {
  /**
   * FocusTrap type defs
   *
   * @see './focus_trap.js'
   */
  interface EuiFocusTrapProps {
    clickOutsideDisables?: boolean,
  }

  export const EuiFocusTrap: SFC<
    CommonProps & ReactFocusLockProps & EuiFocusTrapProps
  >;
}
