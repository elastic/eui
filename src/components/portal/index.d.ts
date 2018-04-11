declare module '@elastic/eui' {
  import { SFC } from 'react';

  /**
   * portal type defs
   *
   * @see './portal.js'
   */
  type EuiPortalProps = {
    children: React.ReactNode;
  };

  export const EuiPortal: SFC<EuiPortalProps>;
}
