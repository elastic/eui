/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  Children,
  cloneElement,
  MutableRefObject,
  ReactElement,
  Ref,
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { CommonProps } from '../../common';

export interface HTMLConstraintValidityElement extends Element {
  setCustomValidity: (error: string) => void;
  validationMessage: string | undefined;
}

export interface ReactElementWithRef extends ReactElement {
  ref?: Ref<HTMLConstraintValidityElement>;
}

function isMutableRef(
  ref?: Ref<HTMLConstraintValidityElement>
): ref is MutableRefObject<HTMLConstraintValidityElement> {
  return ref != null && ref.hasOwnProperty('current');
}

/**
 * The `EuiValidatableControl` component should be used in scenarios where
 * we can render the validated `<input>` as its direct child.
 */
export interface EuiValidatableControlProps {
  children: ReactElementWithRef;
  /**
   * Determines whether to set both native browser `:invalid` state
   * and an `aria-invalid` attribute
   */
  isInvalid?: boolean;
  /**
   * Allows setting a custom `:invalid` validation message on the input.
   * If passed 'browser', will attempt to display the current native browser
   * validation message instead
   */
  invalidMessage?: string | 'browser';
}

export const EuiValidatableControl: FunctionComponent<
  CommonProps & EuiValidatableControlProps
> = ({ isInvalid, invalidMessage, children }) => {
  // Note that this must be state and not a ref to cause a rerender/set invalid state on initial mount
  const [control, setControl] = useState<HTMLConstraintValidityElement | null>(
    null
  );

  const child = Children.only(children);
  const childRef = child.ref;

  const replacedRef = useCallback(
    (element: HTMLConstraintValidityElement) => {
      setControl(element);

      // Call the original ref, if any
      if (typeof childRef === 'function') {
        childRef(element);
      } else if (isMutableRef(childRef)) {
        childRef.current = element;
      }
    },
    [childRef]
  );

  useSetControlValidity({ controlEl: control, isInvalid, invalidMessage });

  return cloneElement(child, {
    ref: replacedRef,
    'aria-invalid': isInvalid || child.props['aria-invalid'],
  });
};

/**
 * The `UseEuiValidatableControl` hook should be used in scenarios where
 * we *cannot* control where the validated `<input>` is rendered (e.g., ReactDatePicker)
 * and instead need to access the input via a ref and pass the element in directly
 */
export type UseEuiValidatableControlProps = Pick<
  EuiValidatableControlProps,
  'isInvalid' | 'invalidMessage'
> & {
  controlEl: HTMLInputElement | HTMLConstraintValidityElement | null;
};

export const useEuiValidatableControl = ({
  isInvalid,
  controlEl,
}: UseEuiValidatableControlProps) => {
  useSetControlValidity({ controlEl, isInvalid });

  useEffect(() => {
    if (!controlEl) return;

    if (typeof isInvalid === 'boolean') {
      controlEl.setAttribute('aria-invalid', String(isInvalid));
    } else {
      controlEl.removeAttribute('aria-invalid');
    }
  }, [isInvalid, controlEl]);
};

/**
 * Internal `setCustomValidity` helper
 * (exported for testing only)
 */
export const useSetControlValidity = ({
  controlEl,
  isInvalid,
  invalidMessage,
}: UseEuiValidatableControlProps) => {
  useEffect(() => {
    if (
      controlEl == null ||
      typeof controlEl.setCustomValidity !== 'function'
    ) {
      return;
    }

    if (isInvalid) {
      const customValidityMessage =
        invalidMessage === 'browser'
          ? controlEl.validationMessage
          : invalidMessage;

      controlEl.setCustomValidity(customValidityMessage || 'Invalid');
    } else {
      controlEl.setCustomValidity('');
    }
  }, [isInvalid, invalidMessage, controlEl]);
};
