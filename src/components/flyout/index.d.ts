import { CommonProps } from '../common';

import { EuiFlyoutFooterProps } from './flyout_footer';
import { EuiFlyoutHeaderProps } from './flyout_header';
import { EuiFlyoutBodyProps } from './flyout_body';

declare module '@elastic/eui' {
  export interface EuiFlyoutProps {
    onClose: () => void;
    size?: 's' | 'm' | 'l';
    /**
     * Hides the default close button. You must provide another close button somewhere within the flyout.
     */
    hideCloseButton?: boolean;
    /**
     * Locks the mouse / keyboard focus to within the flyout
     */
    ownFocus?: boolean;
    /**
     * Specify an aria-label for the close button of the flyout.
     */
    closeButtonAriaLabel?: string;
    /**
     * Sets the max-width of the page,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    maxWidth?: boolean | number | string;
  }

  export const EuiFlyout: React.FunctionComponent<CommonProps & EuiFlyoutProps>;

  /**
   * Flyout body type defs
   *
   * @see './flyout_body.js'
   */
  export const EuiFlyoutBody: EuiFlyoutBodyProps;

  /**
   * Flyout footer type defs
   *
   * @see './flyout_footer.js'
   */
  export const EuiFlyoutFooter: EuiFlyoutFooterProps;

  /**
   * Flyout header type defs
   *
   * @see './flyout_header.js'
   */
  export const EuiFlyoutHeader: EuiFlyoutHeaderProps;
}
