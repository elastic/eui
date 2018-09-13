/// <reference path="../common.d.ts" />

import { SFC, HTMLAttributes } from 'react';

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


}
