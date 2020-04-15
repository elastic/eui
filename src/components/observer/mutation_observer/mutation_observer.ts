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

import { ReactNode } from 'react';

import { EuiObserver } from '../observer';

interface Props {
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onMutation: MutationCallback;
  observerOptions?: MutationObserverInit;
}

export class EuiMutationObserver extends EuiObserver<Props> {
  name = 'EuiMutationObserver';

  // the `onMutation` prop may change while the observer is bound, abstracting
  // it out into a separate function means the current `onMutation` value is used
  onMutation: MutationCallback = (records, observer) => {
    this.props.onMutation(records, observer);
  };

  beginObserve = () => {
    // IE11 and the MutationObserver polyfill used in Kibana (for Jest) implement
    // an older spec in which specifying `attributeOldValue` or `attributeFilter`
    // without specifying `attributes` results in a `SyntaxError`.
    // The following logic patches the newer spec in which `attributes: true` can be
    // implied when appropriate (`attributeOldValue` or `attributeFilter` is specified).
    const observerOptions: MutationObserverInit = {
      ...this.props.observerOptions,
    };
    const needsAttributes =
      observerOptions.hasOwnProperty('attributeOldValue') ||
      observerOptions.hasOwnProperty('attributeFilter');
    if (needsAttributes && !observerOptions.hasOwnProperty('attributes')) {
      observerOptions.attributes = true;
    }

    this.observer = new MutationObserver(this.onMutation);
    this.observer.observe(this.childNode!, observerOptions);
  };
}
