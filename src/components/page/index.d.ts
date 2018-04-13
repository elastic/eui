/// <reference path="../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * @see './page.js'
   */

  export interface EuiPageProps {
    children?: ReactNode;
  }

  export const EuiPage: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageProps
    >;


  /**
   * @see ./page_header/page_header.js
   */

  export interface EuiPageHeaderProps {
    children?: ReactNode;
  }

  export const EuiPageHeader: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageHeaderProps
    >;


  /**
   * @see ./page_header/page_header_section.js
   */

  export interface EuiPageHeaderSectionProps {
    children?: ReactNode;
  }

  export const EuiPageHeaderSection: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageHeaderSectionProps
    >;


  /**
   * @see ./page_body/page_body.js
   */

  export namespace EuiPageBody {
    export interface Props {
      children?: ReactNode;
    }
  }
  export const EuiPageBody: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageBody.Props
    >;


  /**
   * @see ./page_content/page_content.js
   */

  export type EuiPageContentPaddingSize = 'none' | 's' | 'm' | 'l';
  export type EuiPageContentVerticalPosition = 'center';
  export type EuiPageContentHorizontalPosition = 'center';

  export interface EuiPageContentProps {
    children?: ReactNode;
    panelPaddingSize?: EuiPageContentPaddingSize;
    verticalPosition?: EuiPageContentVerticalPosition;
    horizontalPosition?: EuiPageContentHorizontalPosition;
  }

  export const EuiPageContent: SFC<
    CommonProps & EuiPanelProps & EuiPageContentProps
    >;


  /**
   * @see ./page_content/page_content_body.js
   */

  export interface EuiPageContentBodyProps {
    children?: ReactNode;
  }

  export const EuiPageContentBody: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageContentBodyProps
    >;


  /**
   * @see ./page_content/page_content_header.js
   */

  export interface EuiPageContentHeaderProps {
    children?: ReactNode;
  }

  export const EuiPageContentHeader: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageContentHeaderProps
    >;


  /**
   * @see ./page_content/page_content_header_section.js
   */

  export interface EuiPageContentHeaderSectionProps {
    children?: ReactNode;
  }

  export const EuiPageContentHeaderSection: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageContentHeaderSectionProps
    >;

  /**
   * @see ./page_side_bar/page_side_bar.js
   */

  export interface EuiPageSideBarProps {
    children?: ReactNode;
  }

  export const EuiPageSideBar: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPageSideBarProps
    >;

}
