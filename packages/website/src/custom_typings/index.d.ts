import { SerializedStyles } from '@emotion/react';

declare module '!!raw-loader!*' {
  const content: string;
  export default content;
}

declare module 'react' {
  interface HTMLAttributes<T> {
    css?: SerializedStyles;
  }
}
