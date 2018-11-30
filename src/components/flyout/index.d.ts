import { CommonProps } from '../common';

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

  export const EuiFlyout: React.SFC<
    CommonProps &
    EuiFlyoutProps
  >;

  export const EuiFlyoutBody: React.SFC<CommonProps>;

  export interface EuiFlyoutHeaderProps {
    hasBorder?: boolean;
  }
  export const EuiFlyoutHeader: React.SFC<CommonProps & EuiFlyoutHeaderProps>;

  export const EuiFlyoutFooter: React.SFC<CommonProps>;
}
