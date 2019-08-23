import { CommonProps, Omit } from '../common';
import { FocusTarget } from '../focus_trap';

import { ReactNode, FunctionComponent, HTMLAttributes } from 'react';

import { ButtonColor } from '../button';

import { EuiModalFooterProps } from './modal_footer';
import { EuiModalHeaderProps } from './modal_header';
import { EuiModalBodyProps } from './modal_body';
import { EuiModalHeaderTitleProps } from './modal_header_title';

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

  export const EuiModal: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalProps
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
    confirmButtonDisabled?: boolean;
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
  export const EuiConfirmModal: FunctionComponent<
    CommonProps &
      Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
      EuiConfirmModalProps
  >;

  /**
   * Modal body type defs
   *
   * @see './modal_body.js'
   */
  export const EuiModalBody: EuiModalBodyProps;

  /**
   * Modal footer type defs
   *
   * @see './modal_footer.js'
   */
  export const EuiModalFooter: EuiModalFooterProps;

  /**
   * Modal header type defs
   *
   * @see './modal_header.js'
   */
  export const EuiModalHeader: EuiModalHeaderProps;

  /**
   * Modal header title type defs
   *
   * @see './modal_header_title.js'
   */
  export const EuiModalHeaderTitle: EuiModalHeaderTitleProps;
}
