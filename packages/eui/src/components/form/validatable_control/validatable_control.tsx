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
  ReactElement,
  Ref,
  FunctionComponent,
  useEffect,
} from 'react';
import { CommonProps } from '../../common';

export interface HTMLConstraintValidityElement extends Element {
  setCustomValidity: (error: string) => void;
}

export interface ReactElementWithRef extends ReactElement {
  ref?: Ref<HTMLConstraintValidityElement>;
}

/**
 * The `EuiValidatableControl` component should be used in scenarios where
 * we can render the validated `<input>` as its direct child.
 *
 * It flags the underlying control as invalid via `aria-invalid`, which EUI form
 * controls use to render their invalid styling. Note that it intentionally does
 * *not* hook into the native constraint validation API (`setCustomValidity`) -
 * `isInvalid` is a presentational prop, and tying it to native validity would
 * block native form submission and surface a non-localized native error tooltip.
 */
export interface EuiValidatableControlProps {
  isInvalid?: boolean;
  children: ReactElementWithRef;
}

export const EuiValidatableControl: FunctionComponent<
  CommonProps & EuiValidatableControlProps
> = ({ isInvalid, children }) => {
  const child = Children.only(children);

  return cloneElement(child, {
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
  useEffect(() => {
    if (!controlEl) return;

    if (typeof isInvalid === 'boolean') {
      controlEl.setAttribute('aria-invalid', String(isInvalid));
    } else {
      controlEl.removeAttribute('aria-invalid');
    }
  }, [isInvalid, controlEl]);
};
