declare module "@elastic/eui" {

  import { ReactNode } from 'react';

  export type EuiLinkType = 'button' | 'reset' | 'submit';
  export type EuiLinkColor = 'primary' | 'subdued' | 'secondary' | 'accent' | 'danger' | 'warning' | 'ghost';

  export interface EuiLinkProps {
    children?: ReactNode,
    type?: EuiLinkType,
    color?: EuiLinkColor,
    className?: string,
    onClick?: (event: any) => void
  }
  export class EuiLink extends React.Component<EuiLinkProps, {}>{}
}
