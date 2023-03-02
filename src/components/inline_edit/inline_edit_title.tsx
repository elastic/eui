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
import { EuiTitle, EuiTitleSize } from '../title';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { useGeneratedHtmlId } from '../../services/accessibility';
import { EuiInlineEditButtons } from './inline_edit_buttons';
import { getInlineEditIconButtonSettings } from './inline_edit_utils';
import { EuiInlineEditCommonProps } from './inline_edit_types';
// import { useEuiTheme } from '../../services';
// import { euiInlineEditStyles } from './inline_edit.styles';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type Heading = typeof HEADINGS[number];

export type EuiInlineEditTitleProps = CommonProps &
  EuiInlineEditCommonProps & {
    /**
     * Title size level
     */
    size?: EuiTitleSize;
    /**
     * Level of heading to be used for the title
     */
    heading: Heading;
  };

export const EuiInlineEditTitle: FunctionComponent<EuiInlineEditTitleProps> = ({
  children,
  className,
  size = 'm',
  heading,
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
  const classes = classNames('euiInlineEditTitle', className);

  // Styles to come later
  /*const theme = useEuiTheme();
  const styles = euiInlineEditStyles(theme);
  const cssStyles = [styles.euiInlineEdit];*/

  const [isEditing, setIsEditing] = useState(startWithEditOpen);
  const inlineEditInputId = useGeneratedHtmlId({ prefix: '__inlineEditInput' });

  const [editModeValue, setEditModeValue] = useState(defaultValue);
  const [readModeValue, setReadModeValue] = useState(defaultValue);

  const cancelTitleEdit = () => {
    setEditModeValue(readModeValue);
    setIsEditing(!isEditing);
  };

  const saveTitleEditValue = () => {
    if (editModeValue && onConfirm && !onConfirm()) {
      // If there is text, an onConfirm method is present, and it has returned false, cancel the action
      return;
    } else if (editModeValue) {
      setReadModeValue(editModeValue);
      setIsEditing(!isEditing);
    } else {
      // If there's no text, cancel the action, reset the input text, and return to readMode
      cancelTitleEdit();
    }
  };

  const buttonSettings = getInlineEditIconButtonSettings(size);

  const titleEditModeElement = (
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
          size={size as EuiTitleSize}
          saveFunction={saveTitleEditValue}
          cancelFunction={cancelTitleEdit}
        />
      </EuiFlexGroup>
    </EuiForm>
  );

  const H: Heading = heading;
  const titleReadModeElement = (
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
      <EuiTitle size={size}>
        <H>{readModeValue}</H>
      </EuiTitle>
    </EuiButtonEmpty>
  );

  return (
    <div className={classes} {...rest}>
      {isEditing ? titleEditModeElement : titleReadModeElement}
    </div>
  );
};
