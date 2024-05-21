/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Component } from 'react';
import { EuiWindowContext, EuiWindowContextValue } from '../window_provider';

type EventNames = keyof WindowEventMap;

interface Props<Ev extends EventNames> {
  event: Ev;
  handler: (this: Window, ev: WindowEventMap[Ev]) => any;
}

export class EuiWindowEvent<E extends EventNames> extends Component<Props<E>> {
  static contextType = EuiWindowContext;

  componentDidMount() {
    this.addEvent(this.props);
  }

  componentDidUpdate(prevProps: Props<E>) {
    if (
      prevProps.event !== this.props.event ||
      prevProps.handler !== this.props.handler
    ) {
      this.removeEvent(prevProps);
      this.addEvent(this.props);
    }
  }

  componentWillUnmount() {
    this.removeEvent(this.props);
  }

  addEvent<Ev extends EventNames>({ event, handler }: Props<Ev>) {
    const currentWindow = (this.context as EuiWindowContextValue).window;
    currentWindow.addEventListener(event, handler);
  }

  removeEvent<Ev extends EventNames>({ event, handler }: Props<Ev>) {
    const currentWindow = (this.context as EuiWindowContextValue).window;
    currentWindow.removeEventListener(event, handler);
  }

  render() {
    return null;
  }
}
