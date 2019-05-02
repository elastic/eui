import { CommonProps } from '../common';

import { FunctionComponent, FormHTMLAttributes, ReactNode } from 'react';
import { EuiColorPickerSwatchProps } from './color_picker_swatch';
import { EuiHueProps } from './hue';
import { EuiSaturationProps } from './saturation';

declare module '@elastic/eui' {
  /**
   * @see './color_picker_swatch.js'
   */
  export const EuiColorPickerSwatch: FunctionComponent<
    EuiColorPickerSwatchProps
  >;
  /**
   * @see './hue.js'
   */
  export const EuiHue: FunctionComponent<EuiHueProps>;
  /**
   * @see './saturation.js'
   */
  export const EuiSaturation: FunctionComponent<EuiSaturationProps>;
}
