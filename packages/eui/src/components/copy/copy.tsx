/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, createRef, ReactElement, ReactNode } from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiToolTip, EuiToolTipProps, type EuiToolTipRef } from '../tool_tip';

export interface EuiCopyProps extends CommonProps {
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
  /**
   * Optional props to pass to the EuiToolTip component.
   */
  tooltipProps?: Partial<
    Omit<EuiToolTipProps, 'children' | 'content' | 'onMouseOut'>
  >;
}

interface EuiCopyState {
  tooltipText: ReactNode;
  isCopied: boolean;
}

export class EuiCopy extends Component<EuiCopyProps, EuiCopyState> {
  static defaultProps = {
    afterMessage: 'Copied',
  };

  private tooltipRef = createRef<EuiToolTipRef>();

  constructor(props: EuiCopyProps) {
    super(props);

    this.state = {
      tooltipText: this.props.beforeMessage,
      isCopied: false,
    };
  }

  copy = () => {
    const isCopied = copyToClipboard(this.props.textToCopy);
    if (isCopied) {
      this.setState(
        {
          tooltipText: this.props.afterMessage,
          isCopied: true,
        },
        // `EuiToolTip` suppresses showing when content is empty, so `EuiCopy`
        // imperatively shows the tooltip after the post-copy state update.
        () => {
          this.tooltipRef.current?.showToolTip();
        }
      );
    }
  };

  resetTooltipText = () => {
    this.setState({
      tooltipText: this.props.beforeMessage,
      isCopied: false,
    });
  };

  render() {
    const { children, tooltipProps, afterMessage } = this.props;
    const { tooltipText, isCopied } = this.state;

    return (
      <>
        {/* See `src/components/tool_tip/tool_tip_anchor.tsx` for explanation of below eslint-disable */}
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <EuiToolTip
          ref={this.tooltipRef}
          content={tooltipText}
          onMouseOut={this.resetTooltipText}
          {...tooltipProps}
          onBlur={() => {
            tooltipProps?.onBlur?.();
            if (isCopied) this.resetTooltipText();
          }}
          disableScreenReaderOutput={
            isCopied || !!tooltipProps?.disableScreenReaderOutput
          }
        >
          {children(this.copy)}
        </EuiToolTip>
        {/* Stable `aria-live` region so VoiceOver/Safari announces reliably.
       `EuiScreenReaderLive` alternates `aria-live` between "off" and active which
        Safari ignores when attribute and content change in the same render. */}
        <EuiScreenReaderOnly>
          <div aria-live="assertive" aria-atomic="true">
            {isCopied ? afterMessage : ''}
          </div>
        </EuiScreenReaderOnly>
      </>
    );
  }
}
