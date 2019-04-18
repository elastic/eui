import { HTMLAttributes, Component } from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  export class EuiErrorBoundary extends Component<
    CommonProps & HTMLAttributes<HTMLDivElement>
    > {}
}
