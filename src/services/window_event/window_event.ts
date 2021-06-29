/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Component } from 'react';

type EventNames = keyof WindowEventMap;

interface Props<Ev extends EventNames> {
  event: Ev;
  handler: (this: Window, ev: WindowEventMap[Ev]) => any;
}

export class EuiWindowEvent<E extends EventNames> extends Component<Props<E>> {
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
    window.addEventListener(event, handler);
  }

  removeEvent<Ev extends EventNames>({ event, handler }: Props<Ev>) {
    window.removeEventListener(event, handler);
  }

  render() {
    return null;
  }
}
