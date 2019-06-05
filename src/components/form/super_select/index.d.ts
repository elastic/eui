import { CommonProps, Omit } from '../../common';

import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './super_select.js'
   */

  export type EuiSuperSelectProps<T extends string> = CommonProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
      /**
       * Pass an array of options that must at least include:
       * `value`: storing unique value of item,
       * `inputDisplay`: what shows inside the form input when selected
       * `dropdownDisplay` (optional): what shows for the item in the dropdown
       */
      options: Array<{
        value: T;
        inputDisplay?: ReactNode;
        dropdownDisplay?: ReactNode;
        disabled?: boolean;
        'data-test-subj'?: string;
      }>;

      valueOfSelected?: T;

      /**
       * Classes for the context menu item
       */
      itemClassName?: string;

      /**
       * You must pass an `onChange` function to handle the update of the value
       */
      onChange?: (value: T) => void;

      /**
       * Change to `true` if you want horizontal lines between options.
       * This is best used when options are multi-line.
       */
      hasDividers?: boolean;

      /**
       * Change `EuiContextMenuItem` layout position of icon
       */
      itemLayoutAlign?: string;

      /**
       * Make it wide. Default: false
       */
      fullWidth?: boolean;

      /**
       * Provides invalid styling. Default: false
       */
      isInvalid?: boolean;

      /**
       * Provides a loading indicator. Default: false
       */
      isLoading?: boolean;

      /**
       * Make it short. Default: false
       */
      compressed?: boolean;

      /**
       * Applied to the outermost wrapper (popover)
       */
      popoverClassName?: string;

      /**
       * Controls whether the options are shown. Default: false
       */
      isOpen?: boolean;
    };

  export const EuiSuperSelect: <T extends string>(
    props: EuiSuperSelectProps<T>
  ) => ReturnType<FunctionComponent<EuiSuperSelectProps<T>>>;
}
