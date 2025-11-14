/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { cloneElement, HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

import { useGeneratedHtmlId } from '../../services';
import type { EuiToolTipProps } from './tool_tip';
import { euiToolTipAnchorStyles } from './tool_tip.styles';

export type EuiToolTipAnchorProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'onBlur' | 'onFocus' | 'children'
> &
  Required<Pick<EuiToolTipProps, 'display' | 'children'>> & {
    onBlur: () => void;
    onFocus: () => void;
    isVisible: boolean;
  };

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

    const anchorId = useGeneratedHtmlId({
      suffix: 'euiToolTipAnchor',
      conditionalId: id ? `${id}-wrapper` : undefined,
    });

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <span
        ref={ref}
        css={cssStyles}
        /* A11y: NVDA combines elements with identical markup into a single navigational stop. ¯\_(ツ)_/¯
        The `id` ensures the wrappers are unique and navigated as standalone elements. (data- attributes don't work) */
        id={anchorId}
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
          'aria-describedby':
            isVisible && id
              ? classNames(id, children.props['aria-describedby'])
              : children.props['aria-describedby'],
        })}
      </span>
    );
  }
);
EuiToolTipAnchor.displayName = 'EuiToolTipAnchor';
