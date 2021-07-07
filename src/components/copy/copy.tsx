/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactElement, ReactNode } from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';

export interface EuiCopyProps
  extends CommonProps,
    Partial<Omit<EuiToolTipProps, 'children'>> {
  /**
   * Text that will be copied to clipboard when copy function is executed.
   */
  textToCopy: string;
  /**
   * Tooltip message displayed before copy function is called.
   */
  beforeMessage?: ReactNode;
  /**
   * Tooltip message displayed after copy function is called that lets the user know that
   * 'textToCopy' has been copied to the clipboard.
   */
  afterMessage?: ReactNode;
  /**
   * Function that must return a component. First argument is 'copy' function.
   * Use your own logic to create the component that users interact with when triggering copy.
   */
  children(copy: () => void): ReactElement;
}

interface EuiCopyState {
  tooltipText: ReactNode;
}

export class EuiCopy extends Component<EuiCopyProps, EuiCopyState> {
  static defaultProps = {
    afterMessage: 'Copied',
  };

  constructor(props: EuiCopyProps) {
    super(props);

    this.state = {
      tooltipText: this.props.beforeMessage,
    };
  }

  copy = () => {
    const isCopied = copyToClipboard(this.props.textToCopy);
    if (isCopied) {
      this.setState({
        tooltipText: this.props.afterMessage,
      });
    }
  };

  resetTooltipText = () => {
    this.setState({
      tooltipText: this.props.beforeMessage,
    });
  };

  render() {
    const {
      children,
      textToCopy,
      beforeMessage,
      afterMessage,
      ...rest
    } = this.props;

    return (
      // See `src/components/tool_tip/tool_tip.js` for explanation of below eslint-disable
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <EuiToolTip
        content={this.state.tooltipText}
        onMouseOut={this.resetTooltipText}
        {...rest}>
        {children(this.copy)}
      </EuiToolTip>
    );
  }
}
