/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { LEFT_ALIGNMENT, useEuiMemoizedStyles } from '../../services';
import { isObject } from '../../services/predicate';
import { EuiTextBlockTruncate } from '../text_truncate';

import type { EuiTableRowCellProps } from './table_row_cell';
import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { euiTableCellContentStyles } from './_table_cell_content.styles';

export type EuiTableCellContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  Pick<EuiTableRowCellProps, 'align' | 'hasActions' | 'textOnly'> & {
    truncateText?: EuiTableRowCellProps['truncateText'] | null;
  };

export const EuiTableCellContent: FunctionComponent<
  EuiTableCellContentProps
> = ({
  children,
  className,
  align = LEFT_ALIGNMENT,
  textOnly,
  truncateText = false,
  hasActions,
  ...rest
}) => {
  const isResponsive = useEuiTableIsResponsive();

  const styles = useEuiMemoizedStyles(euiTableCellContentStyles);
  const cssStyles = [
    styles.euiTableCellContent,
    styles[align],
    truncateText === true && styles.truncateText,
    truncateText === false && styles.wrapText,
    ...(hasActions
      ? [
          styles.hasActions.actions,
          !isResponsive && styles.hasActions.desktop,
          isResponsive && hasActions !== 'custom' && styles.hasActions.mobile,
        ]
      : []),
  ];

  const classes = classNames('euiTableCellContent', className);

  const renderedChildren = useMemo(() => {
    const textClasses = 'euiTableCellContent__text';

    if (isObject(truncateText) && truncateText.lines) {
      return (
        <EuiTextBlockTruncate lines={truncateText.lines} cloneElement>
          <span className={textClasses}>{children}</span>
        </EuiTextBlockTruncate>
      );
    }
    if (textOnly === true || truncateText === true) {
      return <span className={textClasses}>{children}</span>;
    }
    return children;
  }, [children, textOnly, truncateText]);

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {renderedChildren}
    </div>
  );
};
