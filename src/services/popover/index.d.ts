declare module '@elastic/eui' {
  type EuiToolTipPosition = 'top' | 'right' | 'bottom' | 'left';

  type EuiPopoverAnchorRect = {
    top: number;
    left: number;
    width: number;
    height: number;
  };

  type EuiPopoverDimensions = {
    width: number;
    height: number;
  };

  export const calculatePopoverPosition: (
    anchorBounds: EuiPopoverAnchorRect,
    popoverBounds: EuiPopoverDimensions,
    requestedPosition: EuiToolTipPosition,
    buffer?: number,
    positions?: EuiToolTipPosition[]
  ) => {
    top: number;
    left: number;
    width: number;
    height: number;
    position: EuiToolTipPosition;
  };
}
