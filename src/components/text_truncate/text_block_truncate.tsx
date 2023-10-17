/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  isValidElement,
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
  useMemo,
} from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { cloneElementWithCss } from '../../services';

const styles = {
  euiTextBlockTruncate: css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 0;
    overflow: hidden;
  `,
};

export type EuiTextBlockTruncateProps = PropsWithChildren &
  CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Number of lines of text to truncate to
     */
    lines: number;
    /**
     * Applies styling to the child element instead of rendering a parent wrapper `div`.
     * Can only be used when wrapping a *single* child element/tag, and not raw text.
     */
    cloneElement?: boolean;
  };

export const EuiTextBlockTruncate: FunctionComponent<
  EuiTextBlockTruncateProps
> = ({ children, className, style, lines, cloneElement, ...rest }) => {
  const classes = classNames('euiTextBlockTruncate', className);

  const cssStyles = styles.euiTextBlockTruncate;

  const inlineStyles = useMemo(
    () => ({
      WebkitLineClamp: lines,
      ...style,
    }),
    [lines, style]
  );

  if (isValidElement(children) && cloneElement) {
    return cloneElementWithCss(children, {
      css: cssStyles,
      style: { ...children.props.style, ...inlineStyles },
      className: classNames(children.props.className, classes),
    });
  } else {
    return (
      <div className={classes} css={cssStyles} style={inlineStyles} {...rest}>
        {children}
      </div>
    );
  }
};
