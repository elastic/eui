/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiButtonEmptyPropsForButton } from '../button/button_empty/button_empty';
import { EuiFieldTextProps } from '../form';

type _ButtonPropsWithoutOnClick = Omit<EuiButtonEmptyPropsForButton, 'onClick'>;

export type EuiInlineEditCommonProps = {
  defaultValue: string;
  /**
   * Allow users to pass in a function that is called when the confirm button is clicked
   * The function should return a boolean flag that will determine if the value will be saved.
   * When the flag is true, the value will be saved. When the flag is false, the user will be
   * returned to editMode.
   */
  onConfirm?: () => boolean;
  /**
   * Form label that appears above the form control
   * This is required for accessibility because there is no visual label on the input
   */
  inputAriaLabel: string;
  /**
   * Aria-label for save button in editMode
   */
  saveButtonAriaLabel?: string;
  /**
   * Aria-label for cancel button in editMode
   */
  cancelButtonAriaLabel?: string;
  /**
   * Start in editMode
   */
  startWithEditOpen?: boolean;
  /**
   * Props that will be applied directly to the EuiEmptyButton displayed in readMode
   */
  readModeProps?: _ButtonPropsWithoutOnClick;
  /**
   * Props that will be applied directly to the EuiFieldText displayed in editMode
   */
  editModeProps?: EuiFieldTextProps;
};
