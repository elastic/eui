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
  useRef,
  useEffect,
  useMemo,
  HTMLAttributes,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';
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
import { EuiSkeletonLoading, EuiSkeletonRectangle } from '../skeleton';
import { useEuiMemoizedStyles, useCombinedRefs, keys } from '../../services';
import { EuiI18n, useEuiI18n } from '../i18n';
import { useGeneratedHtmlId } from '../../services/accessibility';
import { euiInlineEditReadModeStyles } from './inline_edit_form.styles';

// Props shared between the internal form component as well as consumer-facing components
export type EuiInlineEditCommonProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  CommonProps & {
    placeholder?: string;
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
    /**
     * Locks inline edit in read mode and displays the text value
     */
    isReadOnly?: boolean;
  } & ExclusiveUnion<
    {
      /**
       * Initial inline edit text value
       */
      defaultValue: string;
      onCancel?: (previousValue: string) => void;
    },
    {
      /**
       * To use inline edit as a controlled component, continuously pass the value via this prop
       */
      value: string;
      /**
       * Callback required to receive and update `value` based on user input
       */
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      /**
       * Callback required to reset `value` to the previous read mode text value.
       */
      onCancel: (previousValue: string) => void;
    }
  >;

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
  defaultValue = '',
  value: controlledValue = '',
  onChange,
  onCancel,
  placeholder = '',
  inputAriaLabel,
  startWithEditOpen,
  readModeProps,
  editModeProps,
  isLoading = false,
  isInvalid,
  onSave,
  isReadOnly,
  ...rest
}) => {
  const classes = classNames('euiInlineEdit', className);

  const { controlHeight, controlCompressedHeight } =
    useEuiMemoizedStyles(euiFormVariables);
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

  const readModeDescribedById = useGeneratedHtmlId({ prefix: 'inlineEdit' });
  const editModeDescribedById = useGeneratedHtmlId({ prefix: 'inlineEdit' });

  const readModeFocusRef = useRef<HTMLButtonElement | null>(null);
  const editModeFocusRef = useRef<HTMLInputElement | null>(null);
  const setReadModeRefs = useCombinedRefs([
    readModeFocusRef,
    readModeProps?.buttonRef,
  ]);
  const setEditModeRefs = useCombinedRefs([
    editModeFocusRef,
    editModeProps?.inputProps?.inputRef,
  ]);

  const [isEditing, setIsEditing] = useState(false || startWithEditOpen);
  const [editModeValue, setEditModeValue] = useState(defaultValue);

  // readModeValue accepts controlledValue here to provide a reliable backup for the onCancel callback
  const [readModeValue, setReadModeValue] = useState(
    controlledValue || defaultValue
  );

  const value = useMemo(() => {
    if (controlledValue) {
      return controlledValue;
    } else {
      return isEditing ? editModeValue : readModeValue || placeholder;
    }
  }, [controlledValue, editModeValue, readModeValue, isEditing, placeholder]);

  const readModeStyles = useEuiMemoizedStyles(euiInlineEditReadModeStyles);
  const readModeCssStyles = [
    readModeStyles.euiInlineEditReadMode,
    isReadOnly && readModeStyles.isReadOnly,
    placeholder && !readModeValue && readModeStyles.hasPlaceholder,
  ];

  const activateEditMode = () => {
    setIsEditing(true);
    // Waits a tick for state to settle and the focus target to render
    requestAnimationFrame(() => editModeFocusRef.current?.focus());
  };

  const cancelInlineEdit = () => {
    setEditModeValue(readModeValue);
    onCancel?.(readModeValue);
    setIsEditing(false);
    requestAnimationFrame(() => readModeFocusRef.current?.focus());
  };

  const saveInlineEditValue = async () => {
    // If an onSave callback is present, and returns false, stay in edit mode
    if (onSave) {
      const onSaveReturn = onSave(value);
      const awaitedReturn =
        onSaveReturn instanceof Promise ? await onSaveReturn : onSaveReturn;
      if (awaitedReturn === false) return;
    }

    setReadModeValue(editModeValue);
    setIsEditing(false);
    requestAnimationFrame(() => readModeFocusRef.current?.focus());
  };

  const editModeInputOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case keys.ENTER:
        event.preventDefault(); // Enter keypresses will not proceed otherwise on webkit browsers & screen readers
        saveInlineEditValue();
        break;
      case keys.ESCAPE:
        cancelInlineEdit();
        break;
    }
  };

  // If the state of isReadOnly changes while in edit mode, switch back to read mode
  useEffect(() => {
    if (isReadOnly) {
      setIsEditing(false);
    }
  }, [isReadOnly]);

  const editModeForm = (
    <EuiFlexGroup gutterSize="s" responsive={false}>
      <EuiFlexItem>
        <EuiFormRow
          fullWidth
          isInvalid={isInvalid}
          error={isInvalid && editModeProps?.formRowProps?.error}
          {...editModeProps?.formRowProps}
        >
          <EuiFieldText
            fullWidth
            value={value}
            aria-label={inputAriaLabel}
            compressed={sizes.compressed}
            isInvalid={isInvalid}
            isLoading={isLoading}
            data-test-subj="euiInlineEditModeInput"
            placeholder={placeholder || undefined} // Opt not to render the prop entirely if an empty string is passed
            {...editModeProps?.inputProps}
            inputRef={setEditModeRefs}
            onChange={(e) => {
              setEditModeValue(e.target.value);
              onChange?.(e);
              editModeProps?.inputProps?.onChange?.(e);
            }}
            onKeyDown={(e) => {
              editModeInputOnKeyDown(e);
              editModeProps?.inputProps?.onKeyDown?.(e);
            }}
            aria-describedby={classNames(
              editModeDescribedById,
              editModeProps?.inputProps?.['aria-describedby']
            )}
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
        <EuiSkeletonLoading
          isLoading={isLoading}
          announceLoadingStatus={true}
          announceLoadedStatus={false}
          loadingContent={
            <EuiFlexGroup gutterSize="s">
              <EuiSkeletonRectangle
                height={loadingSkeletonSize}
                width={loadingSkeletonSize}
                borderRadius="m"
              />
              <EuiSkeletonRectangle
                height={loadingSkeletonSize}
                width={loadingSkeletonSize}
                borderRadius="m"
              />
            </EuiFlexGroup>
          }
          loadedContent={
            <EuiFlexGroup gutterSize="s">
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
            </EuiFlexGroup>
          }
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const readModeElement = (
    <>
      <EuiButtonEmpty
        color="text"
        iconType={isReadOnly ? undefined : 'pencil'}
        iconSide="right"
        flush="both"
        iconSize={sizes.iconSize}
        size={sizes.buttonSize}
        data-test-subj="euiInlineReadModeButton"
        disabled={isReadOnly}
        css={readModeCssStyles}
        title={value}
        {...readModeProps}
        buttonRef={setReadModeRefs}
        aria-describedby={classNames(
          readModeDescribedById,
          readModeProps?.['aria-describedby']
        )}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          activateEditMode();
          readModeProps?.onClick?.(e);
        }}
      >
        {children(value)}
      </EuiButtonEmpty>
      <span id={readModeDescribedById} hidden>
        {!isReadOnly && (
          <EuiI18n
            token="euiInlineEditForm.activateEditModeDescription"
            default="Click to edit this text inline."
          />
        )}
      </span>
    </>
  );

  return (
    <div className={classes} {...rest}>
      {isEditing ? editModeForm : readModeElement}
    </div>
  );
};
