/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  HTMLAttributes,
  ReactElement,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { euiToolTipAnchorStyles } from './tool_tip.styles';

export interface EuiToolTipAnchorProps
  extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    'onBlur' | 'onFocus' | 'children'
  > {
  onBlur: () => void;
  onFocus: () => void;
  children: ReactElement;
  isVisible: boolean;
  display: 'block' | 'inlineBlock';
}

export const EuiToolTipAnchor = forwardRef<
  HTMLSpanElement,
  EuiToolTipAnchorProps
>(
  (
    {
      onBlur,
      onFocus,
      onMouseOver,
      onMouseOut,
      id,
      className,
      children,
      display,
      isVisible,
      ...rest
    },
    ref
  ) => {
    const anchorCss = euiToolTipAnchorStyles();
    const cssStyles = [anchorCss.euiToolTipAnchor, anchorCss[display]];

    const classes = classNames('euiToolTipAnchor', className);

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <span
        ref={ref}
        css={cssStyles}
        {...rest}
        className={classes}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {/**
         * Re: jsx-a11y/mouse-events-have-key-events
         * We apply onFocus, onBlur, etc to the children element because that's the element
         * the user will be interacting with, as opposed to the enclosing anchor element.
         * For example, if the inner component is a button and the user tabs to it, we want
         * the enter key to trigger the button. That won't work if the enclosing anchor
         * element has focus.
         */}
        {cloneElement(children, {
          onFocus: (e: React.FocusEvent) => {
            onFocus();
            children.props.onFocus && children.props.onFocus(e);
          },
          onBlur: (e: React.FocusEvent) => {
            onBlur();
            children.props.onBlur && children.props.onBlur(e);
          },
          ...(isVisible && { 'aria-describedby': id }),
        })}
      </span>
    );
  }
);
EuiToolTipAnchor.displayName = 'EuiToolTipAnchor';
