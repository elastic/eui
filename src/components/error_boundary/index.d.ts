import { HTMLAttributes, Component } from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  // eslint-disable-next-line react/prefer-stateless-function
  export class EuiErrorBoundary extends Component<
    CommonProps & HTMLAttributes<HTMLDivElement>
  > {}
}
