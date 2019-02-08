import { CommonProps, Omit } from '../common';
/// <reference path="../button/index.d.ts" />

import { FocusTarget } from '../focus_trap';
import { ReactNode, SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * Modal type defs
   *
   * @see './modal.js'
   */
  export interface EuiModalProps {
    onClose: () => void;
    /**
     * Sets the max-width of the modal,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    maxWidth?: boolean | number | string;

    /**
     * Specifies what element should initially have focus;
     * Can be a DOM node, or a selector string (which will be passed to document.querySelector() to find the DOM node), or a function that returns a DOM node.
     */
    initialFocus?: FocusTarget;
  }

  export const EuiModal: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalProps
    >;


  /**
   * @see './modal_body.js'
   */
  export const EuiModalBody: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement>
    >;


  /**
   * @see './modal_footer.js'
   */
  export const EuiModalFooter: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement>
    >;


  /**
   * @see './modal_header.js'
   */
  export const EuiModalHeader: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement>
    >;


  /**
   * @see './modal_header_title.js'
   */
  export const EuiModalHeaderTitle: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement>
    >;

  /**
   * Confirm modal type defs
   *
   * @see './confirm_modal.js'
   */

  // index.js re-exports values from confirm_modal.js with these names.
  export const EUI_MODAL_CONFIRM_BUTTON: 'confirm';
  export const EUI_MODAL_CANCEL_BUTTON: 'cancel';

  export interface EuiConfirmModalProps {
    buttonColor?: ButtonColor;
    cancelButtonText?: ReactNode;
    confirmButtonText?: ReactNode;
    defaultFocusedButton?: 'confirm' | 'cancel';
    title?: ReactNode;
    onCancel?: () => void;
    onConfirm?: () => void;
    /**
     * Sets the max-width of the modal,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    maxWidth?: boolean | number | string;
  }

  // `title` from the React defs conflicts with our definition above
  export const EuiConfirmModal: SFC<
    CommonProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'> & EuiConfirmModalProps
    >;

}
