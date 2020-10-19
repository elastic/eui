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

import {
  Children,
  cloneElement,
  MutableRefObject,
  ReactElement,
  Ref,
  FunctionComponent,
  useRef,
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

export interface EuiValidatableControlProps {
  isInvalid?: boolean;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElementWithRef;
}

export const EuiValidatableControl: FunctionComponent<
  CommonProps & EuiValidatableControlProps
> = ({ isInvalid, children }) => {
  const control = useRef<HTMLConstraintValidityElement | null>(null);

  const child = Children.only(children);
  const childRef = child.ref;

  const replacedRef = useCallback(
    (element: HTMLConstraintValidityElement) => {
      control.current = element;

      // Call the original ref, if any
      if (typeof childRef === 'function') {
        childRef(element);
      } else if (isMutableRef(childRef)) {
        childRef.current = element;
      }
    },
    [childRef]
  );

  useEffect(() => {
    if (
      control.current === null ||
      typeof control.current.setCustomValidity !== 'function'
    ) {
      return; // jsdom doesn't polyfill this for the server-side
    }

    if (isInvalid) {
      control.current.setCustomValidity('Invalid');
    } else {
      control.current.setCustomValidity('');
    }
  });

  return cloneElement(child, {
    ref: replacedRef,
  });
};
