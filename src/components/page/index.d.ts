import { CommonProps } from '../common';
/// <reference path="../panel/index.d.ts" />

import { SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  export interface EuiPageWidthProps {
    /**
     * Sets the max-width of the page,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    restrictWidth?: boolean | number | string;
  }

  /**
   * @see './page.js'
   */
  export const EuiPage: SFC<CommonProps & EuiPageWidthProps &HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_header/page_header.js
   */
  export const EuiPageHeader: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_header/page_header_section.js
   */
  export const EuiPageHeaderSection: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_body/page_body.js
   */
  export const EuiPageBody: SFC<CommonProps & EuiPageWidthProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_content/page_content.js
   */

  export type EuiPageContentPaddingSize = 'none' | 's' | 'm' | 'l';
  export type EuiPageContentVerticalPosition = 'center';
  export type EuiPageContentHorizontalPosition = 'center';

  export interface EuiPageContentProps {
    panelPaddingSize?: EuiPageContentPaddingSize;
    verticalPosition?: EuiPageContentVerticalPosition;
    horizontalPosition?: EuiPageContentHorizontalPosition;
  }

  export const EuiPageContent: SFC<CommonProps & EuiPanelProps & EuiPageContentProps>;

  /**
   * @see ./page_content/page_content_body.js
   */
  export const EuiPageContentBody: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_content/page_content_header.js
   */
  export const EuiPageContentHeader: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_content/page_content_header_section.js
   */
  export const EuiPageContentHeaderSection: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * @see ./page_side_bar/page_side_bar.js
   */
  export const EuiPageSideBar: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;
}
