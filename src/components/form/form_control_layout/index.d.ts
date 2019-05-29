import { EuiFormControlLayoutClearButton as FormControlLayoutClearButton } from './form_control_layout_clear_button';
import { EuiFormControlLayoutCustomIcon as FormControlLayoutCustomIcon } from './form_control_layout_custom_icon';

declare module '@elastic/eui' {
  /**
   * @see './form_control_layout_clear_button.js'
   */
  export const EuiFormControlLayoutClearButton: typeof FormControlLayoutClearButton;

  /**
   * @see './form_control_layout_custom_icon.js'
   */
  export const EuiFormControlLayoutCustomIcon: typeof FormControlLayoutCustomIcon;
}
