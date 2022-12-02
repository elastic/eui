/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, forwardRef, useMemo } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { RefractorNode } from 'refractor';
import { logicalStyles } from '../../global_styling';
import { EuiAutoSizer } from '../auto_sizer';
import { nodeToHtml } from './utils';

export const EuiCodeBlockVirtualized = ({
  data,
  rowHeight,
  overflowHeight,
  preProps,
  codeProps,
}: {
  data: RefractorNode[];
  rowHeight: number;
  overflowHeight?: number | string;
  preProps: HTMLAttributes<HTMLPreElement>;
  codeProps: HTMLAttributes<HTMLElement>;
}) => {
  const VirtualizedOuterElement = useMemo(
    () =>
      forwardRef<any, any>(({ style, ...props }, ref) => (
        <pre style={logicalStyles(style)} {...props} ref={ref} {...preProps} />
      )),
    [preProps]
  );

  const VirtualizedInnerElement = useMemo(
    () =>
      forwardRef<any, any>(({ style, ...props }, ref) => (
        <code
          style={logicalStyles(style)}
          {...props}
          ref={ref}
          {...codeProps}
        />
      )),
    [codeProps]
  );

  return (
    <EuiAutoSizer disableHeight={typeof overflowHeight === 'number'}>
      {({ height, width }) => (
        <FixedSizeList
          height={height ?? overflowHeight}
          width={width}
          itemData={data}
          itemSize={rowHeight}
          itemCount={data.length}
          outerElementType={VirtualizedOuterElement}
          innerElementType={VirtualizedInnerElement}
        >
          {ListRow}
        </FixedSizeList>
      )}
    </EuiAutoSizer>
  );
};

const ListRow = ({ data, index, style }: ListChildComponentProps) => {
  const row = data[index];
  row.properties.style = logicalStyles(style);
  return nodeToHtml(row, index, data, 0);
};
