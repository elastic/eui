/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiFormRow, EuiFieldText, EuiForm, EuiFieldTextProps } from '../form';
import { EuiButtonIcon, EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiButtonEmptyPropsForButton } from '../button/button_empty/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { useEuiI18n } from '../i18n';
import { useGeneratedHtmlId } from '../../services/accessibility';

// Props shared between the internal form component as well as consumer-facing components
export type EuiInlineEditCommonProps = CommonProps & {
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
  readModeProps?: Omit<EuiButtonEmptyPropsForButton, 'onClick'>;
  /**
   * Props that will be applied directly to the EuiFieldText displayed in editMode
   */
  editModeProps?: EuiFieldTextProps;
};

// Internal-only props, passed by the consumer-facing components
export type EuiInlineEditFormProps = EuiInlineEditCommonProps & {
  /**
   * Form sizes
   */
  sizes: {
    compressed: boolean;
    buttonSize: EuiButtonEmptyProps['size'];
    iconSize: EuiButtonEmptyProps['iconSize'];
  };
  /**
   * Render prop that returns the read mode value as an arg
   */
  children: (readModeValue: ReactNode) => ReactNode;
};

export const SMALL_SIZE_FORM = {
  iconSize: 's',
  compressed: true,
  buttonSize: 's',
} as const;

export const MEDIUM_SIZE_FORM = {
  iconSize: 'm',
  compressed: false,
  buttonSize: 'm',
} as const;

export const EuiInlineEditForm: FunctionComponent<EuiInlineEditFormProps> = ({
  className,
  children,
  sizes,
  defaultValue,
  onConfirm,
  inputAriaLabel,
  saveButtonAriaLabel,
  cancelButtonAriaLabel,
  startWithEditOpen,
  readModeProps,
  editModeProps,
}) => {
  const classes = classNames('euiInlineEdit', className);

  // Styles to come later! (Styling editMode text to match the size of its readMode counterpart)
  /*const theme = useEuiTheme();
  const styles = euiInlineEditStyles(theme);
  const cssStyles = [styles.euiInlineEdit];*/

  const defaultSaveButtonAriaLabel = useEuiI18n(
    'euiInlineEditForm.saveButtonAriaLabel',
    'Save edit'
  );
  const defaultCancelButtonAriaLabel = useEuiI18n(
    'euiInlineEditForm.cancelButtonAriaLabel',
    'Cancel edit'
  );

  const [isEditing, setIsEditing] = useState(false || startWithEditOpen);
  const inlineEditInputId = useGeneratedHtmlId({ prefix: '__inlineEditInput' });

  const [editModeValue, setEditModeValue] = useState(defaultValue);
  const [readModeValue, setReadModeValue] = useState(defaultValue);

  const cancelInlineEdit = () => {
    setEditModeValue(readModeValue);
    setIsEditing(!isEditing);
  };

  const saveInlineEditValue = () => {
    if (editModeValue && onConfirm && !onConfirm()) {
      // If there is text, an onConfirm method is present, and it has returned false, cancel the action
      return;
    } else if (editModeValue) {
      setReadModeValue(editModeValue);
      setIsEditing(!isEditing);
    } else {
      // If there's no text, cancel the action, reset the input text, and return to readMode
      cancelInlineEdit();
    }
  };

  const editModeForm = (
    <EuiForm fullWidth>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldText
            id={inlineEditInputId}
            value={editModeValue}
            onChange={(e) => {
              setEditModeValue(e.target.value);
            }}
            aria-label={inputAriaLabel}
            autoFocus
            compressed={sizes.compressed}
            {...editModeProps}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false} className={classes}>
          <EuiFormRow>
            <EuiButtonIcon
              iconType="check"
              aria-label={saveButtonAriaLabel || defaultSaveButtonAriaLabel}
              onClick={saveInlineEditValue}
              color="success"
              display="base"
              size={sizes.buttonSize}
              iconSize={sizes.iconSize}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiFormRow>
            <EuiButtonIcon
              iconType="cross"
              aria-label={cancelButtonAriaLabel || defaultCancelButtonAriaLabel}
              onClick={cancelInlineEdit}
              color="danger"
              display="base"
              size={sizes.buttonSize}
              iconSize={sizes.iconSize}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  const readModeElement = (
    <EuiButtonEmpty
      color="text"
      iconType="pencil"
      iconSide="right"
      autoFocus
      flush="both"
      iconSize={sizes.iconSize}
      size={sizes.buttonSize}
      onClick={() => {
        setIsEditing(!isEditing);
      }}
      {...readModeProps}
    >
      {children(readModeValue)}
    </EuiButtonEmpty>
  );

  return (
    <div className={classes}>{isEditing ? editModeForm : readModeElement}</div>
  );
};
