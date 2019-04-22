import { CommonProps } from '../common';

import { FunctionComponent, FormHTMLAttributes, ReactNode } from 'react';
import { EuiHueProps } from './hue';
import { EuiSaturationProps } from './saturation';

declare module '@elastic/eui' {
  /**
   * @see './hue.js'
   */
  export const EuiHue: FunctionComponent<EuiHueProps>;
  /**
   * @see './saturation.js'
   */
  export const EuiSaturation: FunctionComponent<EuiSaturationProps>;
}
