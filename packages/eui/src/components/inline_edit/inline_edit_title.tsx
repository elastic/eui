/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo, FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { EuiTitle, EuiTitleSize } from '../title';

import {
  EuiInlineEditCommonProps,
  EuiInlineEditForm,
  SMALL_SIZE_FORM,
  MEDIUM_SIZE_FORM,
} from './inline_edit_form';
import { euiInlineEditTitleStyles } from './inline_edit_title.styles';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'] as const;
type Heading = (typeof HEADINGS)[number];

export type EuiInlineEditTitleProps = EuiInlineEditCommonProps & {
  /**
   * Title size level
   */
  size?: EuiTitleSize;
  /**
   * Level of heading to be used for the title.
   * Use `span` for text that is not semantically a heading, but should still visually appear as a title.
   */
  heading: Heading;
};

export const EuiInlineEditTitle: FunctionComponent<EuiInlineEditTitleProps> = ({
  className,
  size = 'm',
  heading,
  readModeProps: _readModeProps,
  isReadOnly,
  ...rest
}) => {
  const classes = classNames('euiInlineEditTitle', className);
  const styles = useEuiMemoizedStyles(euiInlineEditTitleStyles);
  const cssStyles = [styles.euiInlineEditTitle, styles.fontSize[size]];

  const H: Heading = heading;

  const isSmallSize = ['xxxs', 'xxs', 'xs', 's'].includes(size);
  const sizes = isSmallSize ? SMALL_SIZE_FORM : MEDIUM_SIZE_FORM;

  const readModeProps = useMemo(() => {
    if (!isReadOnly) return _readModeProps;

    const headingNumber = Number(heading.substring(1));
    return headingNumber
      ? {
          ..._readModeProps,
          role: 'heading',
          'aria-level': headingNumber,
        }
      : {
          ..._readModeProps,
          role: 'paragraph',
        };
  }, [_readModeProps, isReadOnly, heading]);

  return (
    <EuiInlineEditForm
      css={cssStyles}
      className={classes}
      readModeProps={readModeProps}
      isReadOnly={isReadOnly}
      sizes={sizes}
      {...rest}
    >
      {(titleReadModeValue) => (
        <EuiTitle size={size} className="eui-textTruncate">
          <H role={isReadOnly ? 'presentation' : undefined}>
            {titleReadModeValue}
          </H>
        </EuiTitle>
      )}
    </EuiInlineEditForm>
  );
};
