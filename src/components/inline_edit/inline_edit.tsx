/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, useState } from 'react';
import { CommonProps, WithDefaultPropsApplied } from '../common';
import classNames from 'classnames';

import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiFieldText, EuiTextArea, EuiFormRow } from '../form';
import { EuiComboBox, EuiComboBoxOptionOption } from '../combo_box';
import { EuiBadge } from '../badge';

import { htmlIdGenerator } from '../../services/accessibility';

type AcceptableComponents =
  | typeof EuiTextArea
  | typeof EuiFieldText
  | typeof EuiComboBox;

export type EuiInlineEditProps<T extends AcceptableComponents> = HTMLAttributes<
  HTMLDivElement
> &
  CommonProps & {
    /**
     * The type of form control that will be displayed when EuiInlineEdit
     * is in editView
     * @default text
     */
    editViewType?: T;
    /**
     * Props for the form control created by editViewType
     */
    editViewTypeProps?: WithDefaultPropsApplied<T>;
    /**
     * Default string value for input in readView
     */
    defaultValue?: string;
    /**
     * Allow users to pass in a function when the confirm button is clicked
     *
     */
    onConfirm?: () => void;
    confirmButtonAriaLabel?: string;
    cancelButtonAriaLabel?: string;
    /**
     * Start in editView
     */
    startWithEditOpen?: boolean;
    /**
     * Form label that appears above the form control
     */
    label?: String;
  };

export const EuiInlineEdit = <T extends AcceptableComponents>({
  children,
  className,
  //@ts-ignore TypeScript sad :(
  editViewType = EuiFieldText,
  editViewTypeProps,
  defaultValue = 'Click me to edit',
  onConfirm,
  confirmButtonAriaLabel,
  cancelButtonAriaLabel,
  startWithEditOpen,
  label,
  ...rest
}: EuiInlineEditProps<T>) => {
  const classes = classNames('euiEuiInlineEdit', className);

  const EditViewType = editViewType;
  const [isInEdit, setIsInEdit] = useState(startWithEditOpen);
  const inlineTextEditInputId = htmlIdGenerator('__inlineEditInput')();

  /* Text Controls */
  const [textEditViewValue, setTextEditViewValue] = useState(
    defaultValue || ''
  );
  const [textReadViewValue, setTextReadViewValue] = useState(defaultValue);

  /* ComboBox Control */
  const [comboBoxSelectedOptions, setComboBoxSelectedOptions] = useState(
    editViewTypeProps['selectedOptions'] || []
  );

  /* onConfirm / Save Functions */
  const saveTextEditValue = () => {
    const input = (document.getElementById(
      inlineTextEditInputId
    ) as HTMLInputElement).value;
    setTextReadViewValue(input);
    setIsInEdit(!isInEdit);
    onConfirm && onConfirm();
  };

  const saveComboBoxEditValue = () => {
    // we will need to do a check to see if the array is larger than 0 here.
    setComboBoxSelectedOptions(editViewTypeProps['selectedOptions']);
    setIsInEdit(!isInEdit);
    onConfirm && onConfirm();
  };

  /* Shared Elements & Functions (Text & ComboBox) */
  const editViewButtons = (
    <>
      <EuiButtonIcon
        iconType="check"
        aria-label={confirmButtonAriaLabel || 'confirm'}
        onClick={
          EditViewType === EuiComboBox
            ? saveComboBoxEditValue
            : saveTextEditValue
        } // this should be a conditional to switch between text and combobox saves
      />
      <EuiButtonIcon
        iconType="cross"
        aria-label={cancelButtonAriaLabel || 'cancel'}
        onClick={() => {
          setIsInEdit(!isInEdit);
        }}
      />
    </>
  );

  /* Text Elements & Functions (Textarea and FieldText) */
  const editTextViewOnChange = (e: any) => {
    setTextEditViewValue(e.target.value);
  };

  const textEditViewElement = (
    <>
      <EditViewType
        id={inlineTextEditInputId}
        value={textEditViewValue}
        onChange={editTextViewOnChange}
        {...(rest as any)}
      />

      {editViewButtons}
    </>
  );

  const textReadViewElement = (
    <EuiButtonEmpty
      color="text"
      onClick={() => {
        setIsInEdit(!isInEdit);
      }}
    >
      {textReadViewValue}
    </EuiButtonEmpty>
  );

  /* ComboBox Elements & Functions */

  const comboBoxEditViewElement = (
    <>
      <EditViewType
        id={inlineTextEditInputId}
        {...editViewTypeProps}
        {...(rest as any)}
      />

      {editViewButtons}
    </>
  );

  const comboBoxReadViewElement = (
    <EuiButtonEmpty
      color="text"
      onClick={() => {
        setIsInEdit(!isInEdit);
      }}
    >
      {comboBoxSelectedOptions.map(
        (option: EuiComboBoxOptionOption<T>, index: number) => {
          return (
            <EuiBadge
              color="hollow"
              iconType="cross"
              iconSide="right"
              key={index}
            >
              {option.label}
            </EuiBadge>
          );
        }
      )}
    </EuiButtonEmpty>
  );

  /* Current Form Control in View */
  const currentFormControlInView =
    EditViewType === EuiComboBox ? (
      <EuiFormRow label={label}>
        {isInEdit ? comboBoxEditViewElement : comboBoxReadViewElement}
      </EuiFormRow>
    ) : (
      <EuiFormRow label={label}>
        {isInEdit ? textEditViewElement : textReadViewElement}
      </EuiFormRow>
    );

  return (
    <div className={classes} {...rest}>
      {currentFormControlInView}
    </div>
  );
};
