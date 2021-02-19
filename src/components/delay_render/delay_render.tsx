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
