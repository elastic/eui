declare module '@elastic/eui' {

  import { ReactNode } from 'react';

  export type PopoverAnchorPosition = 'upCenter' | 'upLeft' | 'upRight' | 'downCenter' | 'downLeft' | 'downRight' |
    'leftCenter' | 'leftUp' | 'leftDown' | 'rightCenter' | 'rightUp' | 'rightDown';

  interface EuiPopoverProps {
    id: string,
    closePopover: () => void;
    button: ReactNode,
    withTitle?: boolean,
    isOpen?: boolean,
    ownFocus?: boolean,
    children?: ReactNode,
    anchorPosition?: PopoverAnchorPosition,
    panelClassName?: string,
    panelPaddingSize?: PanelPaddingSize,
  }
  export class EuiPopover extends React.Component<EuiPopoverProps, {}> {
  }

}
