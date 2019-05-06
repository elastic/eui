import {
  EuiHeaderLogoProps as HeaderLogoProps,
  EuiHeaderLogo as HeaderLogo,
} from './header_logo';

declare module '@elastic/eui' {
  /**
   * header logo type defs
   *
   * @see './header_logo.js'
   */
  export interface EuiHeaderLogoProps extends HeaderLogoProps {}
  export const EuiHeaderLogo: typeof HeaderLogo;
}
