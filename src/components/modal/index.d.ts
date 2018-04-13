/// <reference path="../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  import { HTMLAttributes } from 'react';

  /**
   * Modal type defs
   *
   * @see './modal.js'
   */
  export interface EuiModalProps {
    className?: string;
    children?: ReactNode;
    onClose: () => void;
  }

  export const EuiModal: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalProps
    >;


  /**
   * @see './modal_body.js'
   */
  export interface EuiModalBodyProps {
    className?: string;
    children?: ReactNode;
  }

  export const EuiModalBody: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalBodyProps
    >;


  /**
   * @see './modal_footer.js'
   */
  export interface EuiModalFooterProps {
    className?: string;
    children?: ReactNode;
  }

  export const EuiModalFooter: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalFooterProps
    >;


  /**
   * @see './modal_header.js'
   */
  export interface EuiModalHeaderProps {
    className?: string;
    children?: ReactNode;
  }

  export const EuiModalHeader: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalHeaderProps
    >;


  /**
   * @see './modal_header_title.js'
   */
  export interface EuiModalHeaderTitleProps {
    className?: string;
    children?: ReactNode;
  }

  export const EuiModalHeaderTitle: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalHeaderTitleProps
    >;


}
