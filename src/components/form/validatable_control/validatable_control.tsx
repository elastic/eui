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

import { Children, cloneElement, Component, ReactElement } from 'react';
import { CommonProps } from '../../common';

export interface HTMLConstraintValidityElement extends Element {
  setCustomValidity: (error: string) => void;
}

export interface ReactElementWithRef extends ReactElement {
  ref?: (element: HTMLConstraintValidityElement) => void;
}

export interface EuiValidatableControlProps {
  isInvalid?: boolean;
  children: ReactElementWithRef;
}

export class EuiValidatableControl extends Component<
  CommonProps & EuiValidatableControlProps
> {
  private control?: HTMLConstraintValidityElement;

  updateValidity() {
    if (
      this.control == null ||
      typeof this.control.setCustomValidity !== 'function'
    ) {
      return; // jsdom doesn't polyfill this for the server-side
    }

    if (this.props.isInvalid) {
      this.control.setCustomValidity('Invalid');
    } else {
      this.control.setCustomValidity('');
    }
  }

  componentDidMount() {
    this.updateValidity();
  }

  componentDidUpdate() {
    this.updateValidity();
  }

  setRef = (element: HTMLConstraintValidityElement) => {
    this.control = element;

    // Call the original ref, if any
    const { ref } = this.props.children;
    if (typeof ref === 'function') {
      ref(element);
    }
  };

  render() {
    const child = Children.only(this.props.children);
    return cloneElement(child, {
      ref: this.setRef,
    });
  }
}
