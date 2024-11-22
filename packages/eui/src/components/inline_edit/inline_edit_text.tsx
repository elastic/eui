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
import { EuiText, EuiTextProps } from '../text';

import {
  EuiInlineEditCommonProps,
  EuiInlineEditForm,
  SMALL_SIZE_FORM,
  MEDIUM_SIZE_FORM,
} from './inline_edit_form';
import { euiInlineEditTextStyles } from './inline_edit_text.styles';

export type EuiInlineEditTextSizes = Exclude<EuiTextProps['size'], 'relative'>;

export type EuiInlineEditTextProps = EuiInlineEditCommonProps & {
  /**
   * Text size level
   */
  size?: EuiInlineEditTextSizes;
};

export const EuiInlineEditText: FunctionComponent<EuiInlineEditTextProps> = ({
  className,
  size = 'm',
  readModeProps: _readModeProps,
  isReadOnly,
  ...rest
}) => {
  const classes = classNames('euiInlineEditText', className);
  const styles = useEuiMemoizedStyles(euiInlineEditTextStyles);
  const cssStyles = [styles.euiInlineEditText, styles.fontSize[size]];

  const isSmallSize = ['xs', 's'].includes(size);
  const sizes = isSmallSize ? SMALL_SIZE_FORM : MEDIUM_SIZE_FORM;

  const readModeProps = useMemo(() => {
    if (!isReadOnly) return _readModeProps;

    return {
      ..._readModeProps,
      role: 'paragraph',
    };
  }, [_readModeProps, isReadOnly]);

  return (
    <EuiInlineEditForm
      className={classes}
      css={cssStyles}
      readModeProps={readModeProps}
      isReadOnly={isReadOnly}
      sizes={sizes}
      {...rest}
    >
      {(textReadModeValue) => (
        <EuiText size={size} className="eui-textTruncate">
          {textReadModeValue}
        </EuiText>
      )}
    </EuiInlineEditForm>
  );
};
