import { FunctionComponent, HTMLAttributes, ReactElement } from 'react';
import { CommonProps, Omit } from '../common';

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

  /**
   * @see './color_picker.js'
   */
  interface HTMLDivElementOverrides {
    color: string;
    onBlur?: () => void;
    onChange: (hex: string) => void;
    onFocus?: () => void;
  }
  export type EuiColorPickerProps = CommonProps &
    Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLDivElementOverrides> &
    HTMLDivElementOverrides & {
      button?: ReactElement;
      compressed?: boolean;
      disabled?: boolean;
      fullWidth?: boolean;
      isInvalid?: boolean;
      mode?: 'default' | 'swatch' | 'picker';
      readOnly?: boolean;
      swatches?: string[];
      popoverZIndex?: number;
    };

  export const EuiColorPicker: FunctionComponent<EuiColorPickerProps>;
}
