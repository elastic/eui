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
