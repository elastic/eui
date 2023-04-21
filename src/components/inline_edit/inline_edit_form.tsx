/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  FunctionComponent,
  useState,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import {
  EuiFormRow,
  EuiFormRowProps,
  EuiFieldText,
  EuiForm,
  EuiFieldTextProps,
} from '../form';
import { euiFormVariables } from '../form/form.styles';
import { EuiButtonIcon, EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiButtonEmptyPropsForButton } from '../button/button_empty/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSkeletonRectangle } from '../skeleton';
import { useEuiTheme } from '../../services';
import { useEuiI18n } from '../i18n';
import { useGeneratedHtmlId } from '../../services/accessibility';

// Props shared between the internal form component as well as consumer-facing components
export type EuiInlineEditCommonProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    defaultValue: string;
    /**
     * Callback that passes the updated value of the edited text when the save button is pressed,
     * and the `onConfirm` callback (if passed) returns true
     */
    onSave?: (onSaveValue: string) => void;
    /**
     * Callback that fires when users click the save button, but before the text actually saves. Passes the current edited
     * text value as an argument.
     */
    onConfirm?: (editModeValue: string) => boolean;
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
     * Props that will be applied directly to the `EuiFormRow` and `EuiFieldText` input displayed in editMode
     */
    editModeProps?: {
      formRowProps?: Partial<EuiFormRowProps>;
      inputProps?: Partial<EuiFieldTextProps>;
    };
    /**
     * Loading state when changes are saved in editMode
     */
    isLoading?: boolean;
    /**
     * Validation for the form control used to edit text in editMode
     */
    isInvalid?: boolean;
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
  isLoading = false,
  isInvalid,
  onSave,
}) => {
  const classes = classNames('euiInlineEdit', className);

  const euiTheme = useEuiTheme();
  const { controlHeight, controlCompressedHeight } = euiFormVariables(euiTheme);
  const loadingSkeletonSize = sizes.compressed
    ? controlCompressedHeight
    : controlHeight;

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
    if (onConfirm && !onConfirm(editModeValue)) {
      // If an onConfirm method is present, and it has returned false, cancel the action
      return;
    } else {
      setReadModeValue(editModeValue);
      setIsEditing(!isEditing);
      onSave?.(editModeValue);
    }
  };

  const editModeForm = (
    <EuiForm fullWidth>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFormRow
            isInvalid={isInvalid}
            error={isInvalid && editModeProps?.formRowProps?.error}
            {...editModeProps?.formRowProps}
          >
            <EuiFieldText
              id={inlineEditInputId}
              value={editModeValue}
              onChange={(e) => {
                setEditModeValue(e.target.value);
              }}
              aria-label={inputAriaLabel}
              autoFocus
              compressed={sizes.compressed}
              isInvalid={isInvalid}
              isLoading={isLoading}
              data-test-subj="euiInlineEditModeInput"
              {...editModeProps?.inputProps}
            />
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={false} className={classes}>
          <EuiFormRow>
            <EuiSkeletonRectangle
              isLoading={isLoading}
              height={loadingSkeletonSize}
              width={loadingSkeletonSize}
              borderRadius="m"
            >
              <EuiButtonIcon
                iconType="check"
                aria-label={saveButtonAriaLabel || defaultSaveButtonAriaLabel}
                onClick={saveInlineEditValue}
                color="success"
                display="base"
                size={sizes.buttonSize}
                iconSize={sizes.iconSize}
                disabled={isInvalid}
              />
            </EuiSkeletonRectangle>
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiFormRow>
            <EuiSkeletonRectangle
              isLoading={isLoading}
              height={loadingSkeletonSize}
              width={loadingSkeletonSize}
              borderRadius="m"
              data-test-subj="euiInlineEditModeCancelLoading"
            >
              <EuiButtonIcon
                iconType="cross"
                aria-label={
                  cancelButtonAriaLabel || defaultCancelButtonAriaLabel
                }
                onClick={cancelInlineEdit}
                color="danger"
                display="base"
                size={sizes.buttonSize}
                iconSize={sizes.iconSize}
                data-test-subj="euiInlineEditModeCancelButton"
              />
            </EuiSkeletonRectangle>
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
      data-test-subj="euiInlineReadModeButton"
      {...readModeProps}
    >
      {children(readModeValue)}
    </EuiButtonEmpty>
  );

  return (
    <div className={classes}>{isEditing ? editModeForm : readModeElement}</div>
  );
};
