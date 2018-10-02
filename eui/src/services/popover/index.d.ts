import { EuiPopoverPosition } from "@elastic/eui";

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

  type EuiPopoverPosition =
    'topLeft' | 'topCenter' | 'topRight' |
    'rightTop' | 'rightCenter' | 'rightBottom' |
    'bottomLeft' | 'bottomCenter' | 'bottomRight' |
    'leftTop' | 'leftCenter' | 'leftBottom';

  type FindPopoverPositionArgs = {
    anchor: HTMLElement | JSX.Element,
    popover: HTMLElement | JSX.Element,
    position: string,
    buffer?: number,
    offset?: number,
    container?: HTMLElement
  }
  export const findPopoverPosition: (
    args: FindPopoverPositionArgs
  ) => {
    position: EuiToolTipPosition,
    relativePosition: EuiPopoverPosition,
    top: number,
    left: number
  };
}
