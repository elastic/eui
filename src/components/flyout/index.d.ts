declare module '@elastic/eui' {
  export interface EuiFlyoutProps {
    onClose: () => void;
    size: 's' | 'm' | 'l';
    /**
     * Hides the default close button. You must provide another close button somewhere within the flyout.
     */
    hideCloseButton: boolean;
    /**
     * Locks the mouse / keyboard focus to within the flyout
     */
    ownFocus: boolean;
  }

  export const EuiFlyout: React.SFC<
    CommonProps &
    EuiFlyoutProps
  >;

  export const EuiFlyoutBody: React.SFC<CommonProps>;

  export interface EuiFlyoutHeaderProps {
    hasBorder: boolean;
  }
  export const EuiFlyoutHeader: React.SFC<CommonProps & EuiFlyoutHeaderProps>;

  export const EuiFlyoutFooter: React.SFC<CommonProps>;
}