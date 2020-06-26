/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  TextareaHTMLAttributes,
  RefCallback,
  MutableRefObject,
  FunctionComponent,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CommonProps, keysOf } from '../../common';
import classNames from 'classnames';
import { EuiValidatableControl } from '../validatable_control';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

import { htmlIdGenerator } from '../../../services';

export const useCombinedRefs = <T extends HTMLTextAreaElement>(
  refs: Array<RefCallback<T> | MutableRefObject<T | undefined> | undefined>
) =>
  useCallback(
    (element: T) =>
      refs.forEach(ref => {
        if (!ref) return;

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === 'function') {
          ref(element);
        } else {
          ref.current = element;
        }
      }),
    [refs]
  );

export type EuiTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;
    readOnly?: boolean;
    isLoading?: boolean;
    /**
     * Allow the height of the textarea to automatically grow as
     * the user types. If no `maxHeight` is set, this means the
     * textarea can infinitely grow based upon the content.
     */
    autoHeight?: boolean;
    /**
     * Sets the max height the textarea can grow too. This value will
     * set a ceiling on `autoHeight` if it is set to `true`
     */
    maxHeight?: number;

    /**
     * Which direction, if at all, should the textarea resize
     */
    resize?: keyof typeof resizeToClassNameMap;

    /**
     * Rows to use for the textarea. A weeker styling method. It's usually
     * better to use `maxHeight` and `autoHeight`.
     */
    rows?: number;

    inputRef?:
      | RefCallback<HTMLTextAreaElement>
      | MutableRefObject<HTMLTextAreaElement>;
    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these.
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside EuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;
  };

const resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone',
};

export const RESIZE = keysOf(resizeToClassNameMap);

export const EuiTextArea: FunctionComponent<EuiTextAreaProps> = ({
  children,
  className,
  compressed,
  fullWidth = false,
  id,
  inputRef,
  isInvalid,
  name,
  placeholder,
  resize = 'vertical',
  rows,
  prepend,
  append,
  readOnly,
  controlOnly,
  onBlur,
  onFocus,
  autoHeight,
  maxHeight,
  isLoading,
  ...rest
}) => {
  const classes = classNames(
    'euiTextArea',
    resizeToClassNameMap[resize],
    {
      'euiTextArea--fullWidth': fullWidth,
      'euiTextArea--compressed': compressed,
      'euiTextArea-isLoading': isLoading,
      'euiTextArea--autoHeight': autoHeight,
    },
    className
  );

  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [textAreaId] = useState(id || htmlIdGenerator()());

  let definedRows: number;

  if (prepend || append) {
    definedRows = 1;
  } else if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  const handleAutoHeight = () => {
    if (textAreaRef.current && (autoHeight || append || prepend)) {
      textAreaRef.current.style.setProperty(
        'height',
        `${textAreaRef.current.scrollHeight}px`,
        'important'
      );
    }
  };

  if (maxHeight && textAreaRef.current) {
    textAreaRef.current.style.setProperty('max-height', `${maxHeight}px`);
  }

  const handleRemoveHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.removeProperty('height');
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Scroll to the top of the textarea if it's used in a append/prepend way
    if (textAreaRef.current && (prepend || append)) {
      handleRemoveHeight();
      textAreaRef.current.scrollTop = 0;
    }

    if (onBlur !== undefined) {
      onBlur(e);
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    handleAutoHeight();
    if (onFocus !== undefined) {
      onFocus(e);
    }
  };

  useEffect(() => {
    if (
      document.activeElement !== null &&
      document.activeElement.id === textAreaId
    ) {
      handleAutoHeight();
    } else if (prepend || append) {
      handleRemoveHeight();
    }
  });

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <textarea
        className={classes}
        {...rest}
        rows={definedRows}
        name={name}
        id={textAreaId}
        ref={useCombinedRefs([textAreaRef, inputRef])}
        readOnly={readOnly}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        placeholder={placeholder}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) return control;

  return (
    <EuiFormControlLayout
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}
      className="euiTextArea__formControlLayout">
      {control}
    </EuiFormControlLayout>
  );
};
