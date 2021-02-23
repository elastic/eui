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

import React, { Component } from 'react';
import { EuiPopover, Props as EuiPopoverProps } from './popover';
import { EuiPortal } from '../portal';

export interface EuiWrappingPopoverProps extends EuiPopoverProps {
  button: HTMLElement;
}

/**
 * Injects the EuiPopover next to the button via EuiPortal
 * then the button element is moved into the popover dom.
 * On unmount, the button is moved back to its original location.
 */
export class EuiWrappingPopover extends Component<EuiWrappingPopoverProps> {
  private portal: HTMLElement | null = null;
  private anchor: HTMLElement | null = null;

  componentDidMount() {
    if (this.anchor) {
      this.anchor.insertAdjacentElement('beforebegin', this.props.button);
    }
  }

  componentWillUnmount() {
    if (this.props.button.parentNode) {
      if (this.portal) {
        this.portal.insertAdjacentElement('beforebegin', this.props.button);
      }
    }
  }

  setPortalRef = (node: HTMLElement | null) => {
    this.portal = node;
  };

  setAnchorRef = (node: HTMLElement | null) => {
    this.anchor = node;
  };

  render() {
    const { button, ...rest } = this.props;

    return (
      <EuiPortal
        portalRef={this.setPortalRef}
        insert={{ sibling: this.props.button, position: 'after' }}>
        <EuiPopover
          {...rest}
          button={
            <div
              ref={this.setAnchorRef}
              className="euiWrappingPopover__anchor"
            />
          }
        />
      </EuiPortal>
    );
  }
}
