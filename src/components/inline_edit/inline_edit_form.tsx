/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiFieldTextProps } from '../form';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiButtonEmptyPropsForButton } from '../button/button_empty/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { useGeneratedHtmlId } from '../../services/accessibility';
import { EuiInlineEditButtons } from './inline_edit_buttons';
import { getInlineEditIconButtonSettings } from './inline_edit_utils';
import { EuiInlineEditTitleProps } from './inline_edit_title';
import { EuiInlineEditTextProps } from './inline_edit_text';
// import { useEuiTheme } from '../../services';
// import { euiInlineEditStyles } from './inline_edit.styles';

type _ButtonPropsWithoutOnClick = Omit<EuiButtonEmptyPropsForButton, 'onClick'>;

export type EuiInlineEditFormProps = CommonProps & {
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

export const EuiInlineEditForm: FunctionComponent<EuiInlineEditFormProps> = ({
  className,
  children,
  updateReadModeValue,
  props,
}) => {
  const classes = classNames('euiInlineEditForm', className);

  // Styles to come later! (Styling editMode text to match the size of its readMode counterpart)
  /*const theme = useEuiTheme();
  const styles = euiInlineEditStyles(theme);
  const cssStyles = [styles.euiInlineEdit];*/

  const {
    startWithEditOpen,
    size,
    defaultValue,
    onConfirm,
    inputAriaLabel,
    saveButtonAriaLabel,
    cancelButtonAriaLabel,
    readModeProps,
    editModeProps,
  } = props;

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
      updateReadModeValue(editModeValue);
      setIsEditing(!isEditing);
    } else {
      // If there's no text, cancel the action, reset the input text, and return to readMode
      cancelInlineEdit();
    }
  };

  const buttonSettings = getInlineEditIconButtonSettings(size);

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
            compressed={buttonSettings.compressed}
            {...editModeProps}
          />
        </EuiFlexItem>

        <EuiInlineEditButtons
          size={size}
          saveFunction={saveInlineEditValue}
          cancelFunction={cancelInlineEdit}
          saveButtonAriaLabel={saveButtonAriaLabel}
          cancelButtonAriaLabel={cancelButtonAriaLabel}
        />
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
      iconSize={buttonSettings.iconSize}
      size={buttonSettings.compressed ? 's' : 'm'}
      onClick={() => {
        setIsEditing(!isEditing);
      }}
      {...readModeProps}
    >
      {children}
    </EuiButtonEmpty>
  );

  return (
    <div className={classes}>{isEditing ? editModeForm : readModeElement}</div>
  );
};
