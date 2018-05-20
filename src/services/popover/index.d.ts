declare module '@elastic/eui' {
  type EuiTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

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
    requestedPosition: EuiTooltipPosition,
    buffer?: number,
    positions?: EuiTooltipPosition[]
  ) => {
    top: number;
    left: number;
    width: number;
    height: number;
    position: EuiTooltipPosition;
  };
}
