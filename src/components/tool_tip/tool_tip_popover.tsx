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

import React, { HTMLAttributes, Component, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

type Props = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    positionToolTip: (rect: ClientRect | DOMRect) => void;
    children?: ReactNode;
    title?: ReactNode;
    popoverRef?: (ref: HTMLDivElement) => void;
  };

export class EuiToolTipPopover extends Component<Props> {
  private popover: HTMLDivElement | undefined;

  updateDimensions = () => {
    requestAnimationFrame(() => {
      // Because of this delay, sometimes `positionToolTip` becomes unavailable.
      if (this.popover) {
        this.props.positionToolTip(this.popover.getBoundingClientRect());
      }
    });
  };

  setPopoverRef = (ref: HTMLDivElement) => {
    this.popover = ref;
    if (this.props.popoverRef) {
      this.props.popoverRef(ref);
    }
  };

  componentDidMount() {
    document.body.classList.add('euiBody-hasPortalContent');

    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const {
      children,
      title,
      className,
      positionToolTip,
      popoverRef,
      ...rest
    } = this.props;

    const classes = classNames('euiToolTipPopover', className);

    let optionalTitle;
    if (title) {
      optionalTitle = <div className="euiToolTip__title">{title}</div>;
    }

    return (
      <div className={classes} ref={this.setPopoverRef} {...rest}>
        {optionalTitle}
        {children}
      </div>
    );
  }
}
