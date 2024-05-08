/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Component, ReactNode } from 'react';

interface BaseProps {
  /**
   * ReactNode to render as this component's content
   */
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
