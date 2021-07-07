/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Component } from 'react';

export interface EuiDelayRenderProps {
  delay: number;
}

interface EuiDelayRenderState {
  toggle: boolean;
}

export class EuiDelayRender extends Component<
  EuiDelayRenderProps,
  EuiDelayRenderState
> {
  static defaultProps = {
    delay: 500,
  };

  private delayID: number | undefined;
  private toBeDelayed: boolean = true;

  constructor(props: EuiDelayRenderProps) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  shouldUpdate() {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  }

  startDelaying = () => {
    window.clearTimeout(this.delayID);
    this.toBeDelayed = true;
    this.delayID = window.setTimeout(this.stopDelaying, this.props.delay);
  };
  stopDelaying = () => {
    window.clearTimeout(this.delayID);
    this.toBeDelayed = false;
    this.shouldUpdate();
  };

  componentDidMount() {
    this.startDelaying();
  }
  shouldComponentUpdate() {
    if (this.toBeDelayed) {
      this.startDelaying();
    }
    return true;
  }
  componentWillUnmount() {
    this.stopDelaying();
  }
  componentDidUpdate() {
    this.toBeDelayed = true;
  }

  render() {
    return !this.toBeDelayed ? this.props.children : null;
  }
}
