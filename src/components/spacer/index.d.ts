declare module "@elastic/eui" {

  import { ReactNode } from 'react';

  export type SpacerSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

  export interface EuiSpacerProps {
    children?: ReactNode,
    className?: string,
    size?: SpacerSize,
    [key: string]: any
  }
  export class EuiSpacer extends React.Component<EuiSpacerProps, {}> {}

}
