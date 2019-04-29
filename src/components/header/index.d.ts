import { EuiHeaderLogo as HeaderLogo } from './header_logo';

declare module '@elastic/eui' {
  /**
   * header logo type defs
   *
   * @see './header_logo.js'
   */
  export const EuiHeaderLogo: typeof HeaderLogo;
}
