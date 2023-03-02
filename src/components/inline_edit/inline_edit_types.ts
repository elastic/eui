/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiButtonEmptyProps } from '../button';
import { EuiFieldTextProps } from '../form';

type _ButtonPropsWithoutOnClick = Omit<EuiButtonEmptyProps, 'onClick'>;

export type EuiInlineEditCommonProps = {
  defaultValue: string;
  /**
   * Allow users to pass in a function when the confirm button is clicked
   */
  onConfirm?: () => void;
  /**
   * Form label that appears above the form control
   * This is required for accessibility because there is no visual label on the input
   */
  inputAriaLabel: string;
  saveButtonAriaLabel?: string;
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
