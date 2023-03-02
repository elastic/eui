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
import { EuiText, EuiTextProps } from '../text';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
// import { useEuiTheme } from '../../services';
// import { euiInlineEditStyles } from './inline_edit.styles';
import { useGeneratedHtmlId } from '../../services/accessibility';
import { EuiInlineEditButtons } from './inline_edit_buttons';
import { getInlineEditIconButtonSettings } from './inline_edit_utils';
import { EuiInlineEditCommonProps } from './inline_edit_types';

export type EuiInlineEditTextSizes = Exclude<EuiTextProps['size'], 'relative'>;

export type EuiInlineEditTextProps = CommonProps &
  EuiInlineEditCommonProps & {
    /**
     * Text size level
     */
    size?: EuiInlineEditTextSizes;
    /**
     * Default string value for input in readMode
     */
  };

export const EuiInlineEditText: FunctionComponent<EuiInlineEditTextProps> = ({
  children,
  className,
  size = 'm',
  defaultValue,
  onConfirm,
  inputAriaLabel,
  saveButtonAriaLabel,
  cancelButtonAriaLabel,
  startWithEditOpen,
  readModeProps,
  editModeProps,
  ...rest
}) => {
  const classes = classNames('euiInlineEditText', className);

  // Styles to come later
  /*const theme = useEuiTheme();
  const styles = euiInlineEditStyles(theme);
  const cssStyles = [styles.euiInlineEdit];*/

  const [isInEdit, setIsInEdit] = useState(startWithEditOpen);
  const inlineEditInputId = useGeneratedHtmlId({ prefix: '__inlineEditInput' });

  const [editModeValue, setEditModeValue] = useState(defaultValue);
  const [readModeValue, setReadModeValue] = useState(defaultValue);

  const saveTextEditValue = () => {
    // If there's no text, cancel the action, reset the input text, and return to readMode
    if (editModeValue) {
      setReadModeValue(editModeValue);
      setIsInEdit(!isInEdit);
      onConfirm && onConfirm();
    } else {
      setEditModeValue(readModeValue);
      setIsInEdit(!isInEdit);
    }
  };

  const cancelTextEdit = () => {
    setEditModeValue(readModeValue);
    setIsInEdit(!isInEdit);
  };

  const buttonSettings = getInlineEditIconButtonSettings(size);

  const textEditModeElement = (
    <EuiForm fullWidth>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldText
            id={inlineEditInputId}
            value={editModeValue}
            onChange={(e) => setEditModeValue(e.target.value)}
            aria-label={inputAriaLabel}
            autoFocus
            compressed={buttonSettings.compressed}
            {...editModeProps}
          />
        </EuiFlexItem>

        <EuiInlineEditButtons
          size={size as EuiTextProps['size']}
          saveFunction={saveTextEditValue}
          cancelFunction={cancelTextEdit}
        />
      </EuiFlexGroup>
    </EuiForm>
  );

  const textReadModeElement = (
    <EuiButtonEmpty
      color="text"
      iconType="pencil"
      iconSide="right"
      autoFocus
      flush="both"
      iconSize={buttonSettings.iconSize}
      size={buttonSettings.compressed ? 's' : 'm'}
      onClick={() => {
        setIsInEdit(!isInEdit);
      }}
      {...readModeProps}
    >
      <EuiText size={size}>{readModeValue}</EuiText>
    </EuiButtonEmpty>
  );

  return (
    <div className={classes} {...rest}>
      {isInEdit ? textEditModeElement : textReadModeElement}
    </div>
  );
};
