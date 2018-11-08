/// <reference path="../common.d.ts" />

import { HTMLAttributes, Component } from 'react';

declare module '@elastic/eui' {
  export class EuiErrorBoundary extends Component<
    CommonProps & HTMLAttributes<HTMLDivElement>
    > {}
}
