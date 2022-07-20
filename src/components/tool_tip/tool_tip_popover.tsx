/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, Component, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

type Props = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    positionToolTip: () => void;
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
        this.props.positionToolTip();
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
