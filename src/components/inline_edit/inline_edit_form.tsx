/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiButtonEmpty } from '../button';
import { EuiFieldText, EuiForm } from '../form';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { useGeneratedHtmlId } from '../../services/accessibility';
import { EuiInlineEditButtons } from './inline_edit_buttons';
import { getInlineEditIconButtonSettings } from './inline_edit_utils';
import { EuiInlineEditTitleProps } from './inline_edit_title';
import { EuiInlineEditTextProps } from './inline_edit_text';
// import { useEuiTheme } from '../../services';
// import { euiInlineEditStyles } from './inline_edit.styles';

export type EuiInlineEditFormProps = CommonProps & {
  props: EuiInlineEditTitleProps | EuiInlineEditTextProps;
  updateReadModeValue: Function;
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
