/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  TextareaHTMLAttributes,
  Ref,
  FunctionComponent,
  useRef,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { useCombinedRefs } from '../../../services';

import { EuiFormControlLayout } from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { useFormContext } from '../eui_form_context';
import { EuiFormControlLayoutIconsProps } from '../form_control_layout/form_control_layout_icons';

export type EuiTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps & {
    icon?: EuiFormControlLayoutIconsProps['icon'];
    isLoading?: boolean;
    isInvalid?: boolean;
    /**
     * Shows a button that allows users to quickly clear the textarea
     */
    isClearable?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    compressed?: boolean;

    /**
     * Which direction, if at all, should the textarea resize
     * @default vertical
     */
    resize?: keyof typeof resizeToClassNameMap;

    inputRef?: Ref<HTMLTextAreaElement>;
  };

const resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone',
};

export const RESIZE = Object.keys(resizeToClassNameMap);

export const EuiTextArea: FunctionComponent<EuiTextAreaProps> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    children,
    className,
    compressed,
    fullWidth = defaultFullWidth,
    id,
    icon,
    inputRef,
    isLoading,
    isInvalid,
    isClearable,
    name,
    placeholder,
    resize = 'vertical',
    rows,
    ...rest
  } = props;

  const classes = classNames(
    'euiTextArea',
    resizeToClassNameMap[resize],
    {
      'euiTextArea--fullWidth': fullWidth,
      'euiTextArea--compressed': compressed,
    },
    className
  );

  let definedRows: number;

  if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  const ref = useRef<HTMLTextAreaElement | null>(null);
  const refs = useCombinedRefs([ref, inputRef]);

  const clear = useMemo(() => {
    if (isClearable) {
      return {
        onClick: () => {
          if (ref.current) {
            // Updates the displayed value and fires `onChange` callbacks
            // @see https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
            const nativeValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLTextAreaElement.prototype,
              'value'
            )!.set!;
            nativeValueSetter.call(ref.current, '');

            const event = new Event('input', {
              bubbles: true,
              cancelable: false,
            });
            ref.current.dispatchEvent(event);

            // Set focus back to the textarea
            ref.current.focus();
          }
        },
        'data-test-subj': 'clearTextAreaButton',
      };
    }
  }, [isClearable]);

  return (
    <EuiFormControlLayout
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      clear={clear}
      icon={icon}
      className="euiFormControlLayout--euiTextArea"
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <textarea
          className={classes}
          {...rest}
          rows={definedRows}
          name={name}
          id={id}
          ref={refs}
          placeholder={placeholder}
        >
          {children}
        </textarea>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};
