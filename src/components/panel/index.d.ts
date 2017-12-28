declare module '@elastic/eui' {

  import { ReactNode } from 'react';

  export type PanelPaddingSize = 'none' | 's' | 'm' | 'l';

  export interface EuiPanelProps {
    children?: ReactNode,
    className?: string,
    hasShadow?: boolean,
    paddingSize?: PanelPaddingSize,
    grow?: boolean,
    panelRef: (panel: HTMLDivElement) => void
  }
  export class EuiPanel extends React.Component<EuiPanelProps, {}> {
  }
}
