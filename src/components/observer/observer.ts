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

import { Component, ReactNode } from 'react';

interface BaseProps {
  children: (ref: any) => ReactNode;
}

export interface Observer {
  disconnect: () => void;
  observe: (element: Element, options?: { [key: string]: any }) => void;
}

export class EuiObserver<Props extends BaseProps> extends Component<Props> {
  protected name: string = 'EuiObserver';
  protected childNode: null | Element = null;
  protected observer: null | Observer = null;

  componentDidMount() {
    if (this.childNode == null) {
      throw new Error(`${this.name} did not receive a ref`);
    }
  }

  componentWillUnmount() {
    if (this.observer != null) {
      this.observer.disconnect();
    }
  }

  updateChildNode = (ref: Element) => {
    if (this.childNode === ref) return; // node hasn't changed

    // if there's an existing observer disconnect it
    if (this.observer != null) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.childNode = ref;

    if (this.childNode != null) {
      this.beginObserve();
    }
  };

  beginObserve: () => void = () => {
    throw new Error('EuiObserver has no default observation method');
  };

  render() {
    const props: BaseProps = this.props;
    return props.children(this.updateChildNode);
  }
}
