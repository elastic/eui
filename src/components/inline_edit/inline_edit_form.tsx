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
  MouseEvent,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import {
  EuiFormRow,
  EuiFormRowProps,
  EuiFieldText,
  EuiFieldTextProps,
} from '../form';
import { euiFormVariables } from '../form/form.styles';
import { EuiButtonIcon, EuiButtonEmpty } from '../button';
import { EuiButtonIconPropsForButton } from '../button/button_icon';
import { EuiButtonEmptyPropsForButton } from '../button/button_empty/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSkeletonRectangle } from '../skeleton';
import { useEuiTheme, keys } from '../../services';
import { EuiI18n, useEuiI18n } from '../i18n';
import { useGeneratedHtmlId } from '../../services/accessibility';

// Props shared between the internal form component as well as consumer-facing components
export type EuiInlineEditCommonProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    defaultValue: string;
    /**
     * Callback that fires when a user clicks the save button.
     * Passes the current edited text value as an argument.
     *
     * To validate the value of the edited text, pass back a boolean flag.
     * If `false`, EuiInlineEdit will remain in edit mode, where loading or invalid states can be set.
     * If `true`, EuiInlineEdit will return to read mode.
     */
    onSave?: (value: string) => void | boolean | Promise<boolean | void>;
    /**
     * Form label that appears above the form control.
     * This is required for accessibility because there is no visual label on the input.
     */
    inputAriaLabel: string;
    /**
     * Starts the component in edit mode
     */
    startWithEditOpen?: boolean;
    /**
     * Props that will be applied directly to the `EuiEmptyButton` displayed in read mode
     */
    readModeProps?: Partial<EuiButtonEmptyPropsForButton>;
    /**
     * Multiple props objects that can be applied directly to various child components displayed in edit mode.
     * - `formRowProps` will be passed to `EuiFormRow`
     * - `inputProps` will be passed to `EuiFieldText`
     * - `saveButtonProps` & `cancelButtonProps` will be passed to their respective `EuiIconButton`s
     */
    editModeProps?: {
      formRowProps?: Partial<EuiFormRowProps>;
      inputProps?: Partial<EuiFieldTextProps>;
      saveButtonProps?: Partial<EuiButtonIconPropsForButton>;
      cancelButtonProps?: Partial<EuiButtonIconPropsForButton>;
    };
    /**
     * Loading state - only displayed in edit mode
     */
    isLoading?: boolean;
    /**
     * Invalid state - only displayed edit mode
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
    buttonSize: EuiButtonEmptyPropsForButton['size'];
    iconSize: EuiButtonEmptyPropsForButton['iconSize'];
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
  inputAriaLabel,
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

  const editModeDescribedById = useGeneratedHtmlId({ prefix: 'inlineEdit' });

  const [isEditing, setIsEditing] = useState(false || startWithEditOpen);
  const inlineEditInputId = useGeneratedHtmlId({ prefix: '__inlineEditInput' });

  const [editModeValue, setEditModeValue] = useState(defaultValue);
  const [readModeValue, setReadModeValue] = useState(defaultValue);

  const cancelInlineEdit = () => {
    setEditModeValue(readModeValue);
    setIsEditing(false);
  };

  const saveInlineEditValue = async () => {
    // If an onSave callback is present, and returns false, stay in edit mode
    if (onSave) {
      const onSaveReturn = onSave(editModeValue);
      const awaitedReturn =
        onSaveReturn instanceof Promise ? await onSaveReturn : onSaveReturn;
      if (awaitedReturn === false) return;
    }

    setReadModeValue(editModeValue);
    setIsEditing(false);
  };

  const editModeInputOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case keys.ENTER:
        saveInlineEditValue();
        break;
      case keys.ESCAPE:
        cancelInlineEdit();
        break;
    }
  };

  const editModeForm = (
    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem>
        <EuiFormRow
          fullWidth
          isInvalid={isInvalid}
          error={isInvalid && editModeProps?.formRowProps?.error}
          {...editModeProps?.formRowProps}
        >
          <EuiFieldText
            fullWidth
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
            aria-describedby={classNames(
              editModeDescribedById,
              editModeProps?.inputProps?.['aria-describedby']
            )}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              editModeInputOnKeyDown(e);
              editModeProps?.inputProps?.onKeyDown?.(e);
            }}
          />
        </EuiFormRow>
        <span id={editModeDescribedById} hidden>
          <EuiI18n
            token="euiInlineEditForm.inputKeyboardInstructions"
            default="Press Enter to save your edited text. Press Escape to cancel your edit."
          />
        </span>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiSkeletonRectangle
          isLoading={isLoading}
          height={loadingSkeletonSize}
          width={loadingSkeletonSize}
          borderRadius="m"
        >
          <EuiButtonIcon
            iconType="check"
            aria-label={defaultSaveButtonAriaLabel}
            color="success"
            display="base"
            size={sizes.buttonSize}
            iconSize={sizes.iconSize}
            data-test-subj="euiInlineEditModeSaveButton"
            {...editModeProps?.saveButtonProps}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              saveInlineEditValue();
              editModeProps?.saveButtonProps?.onClick?.(e);
            }}
          />
        </EuiSkeletonRectangle>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiSkeletonRectangle
          isLoading={isLoading}
          height={loadingSkeletonSize}
          width={loadingSkeletonSize}
          borderRadius="m"
        >
          <EuiButtonIcon
            iconType="cross"
            aria-label={defaultCancelButtonAriaLabel}
            color="danger"
            display="base"
            size={sizes.buttonSize}
            iconSize={sizes.iconSize}
            data-test-subj="euiInlineEditModeCancelButton"
            {...editModeProps?.cancelButtonProps}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              cancelInlineEdit();
              editModeProps?.cancelButtonProps?.onClick?.(e);
            }}
          />
        </EuiSkeletonRectangle>
      </EuiFlexItem>
    </EuiFlexGroup>
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
      data-test-subj="euiInlineReadModeButton"
      {...readModeProps}
      onClick={(e) => {
        setIsEditing(true);
        readModeProps?.onClick?.(e);
      }}
    >
      {children(readModeValue)}
    </EuiButtonEmpty>
  );

  return (
    <div className={classes}>{isEditing ? editModeForm : readModeElement}</div>
  );
};
