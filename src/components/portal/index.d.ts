declare module '@elastic/eui' {
  import { FunctionComponent } from 'react';

  /**
   * portal type defs
   *
   * @see './portal.js'
   */
  type EuiPortalProps = {
    children: React.ReactNode;
  };

  export const EuiPortal: FunctionComponent<EuiPortalProps>;
}
