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
  isInvalid?: boolean;
  children: ReactElementWithRef;
}

export const EuiValidatableControl: FunctionComponent<
  CommonProps & EuiValidatableControlProps
> = ({ isInvalid, children }) => {
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

  useSetControlValidity({ controlEl: control, isInvalid });

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
export interface UseEuiValidatableControlProps {
  isInvalid?: boolean;
  controlEl: HTMLInputElement | HTMLConstraintValidityElement | null;
}

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
 */
const useSetControlValidity = ({
  controlEl,
  isInvalid,
}: UseEuiValidatableControlProps) => {
  useEffect(() => {
    if (
      controlEl == null ||
      typeof controlEl.setCustomValidity !== 'function'
    ) {
      return;
    }

    if (isInvalid) {
      controlEl.setCustomValidity('Invalid');
    } else {
      controlEl.setCustomValidity('');
    }
  }, [isInvalid, controlEl]);
};
