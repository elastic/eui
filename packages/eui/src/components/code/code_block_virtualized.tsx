/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, ReactNode, forwardRef, useMemo } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { RefractorNode } from 'refractor';
import { logicalStyles } from '../../global_styling';
import {
  EuiAutoSizer,
  EuiAutoSize,
  EuiAutoSizeHorizontal,
} from '../auto_sizer';
import { nodeToHtml } from './utils';

export const EuiCodeBlockVirtualized = ({
  data,
  label,
  rowHeight,
  overflowHeight,
  preProps,
  codeProps,
}: {
  data: RefractorNode[];
  label: ReactNode;
  rowHeight: number;
  overflowHeight?: number | string;
  preProps: HTMLAttributes<HTMLPreElement>;
  codeProps: HTMLAttributes<HTMLElement>;
}) => {
  // FIX: Don't inject label inside the virtualized container
  // react-window expects the outer element to be clean for proper scroll calculations
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

  const virtualizationProps = {
    itemData: data,
    itemSize: rowHeight,
    itemCount: data.length,
    outerElementType: VirtualizedOuterElement,
    innerElementType: VirtualizedInnerElement,
  };

  const virtualizedList =
    typeof overflowHeight === 'number' ? (
      <EuiAutoSizer disableHeight={true}>
        {({ width }: EuiAutoSizeHorizontal) => (
          <FixedSizeList
            height={overflowHeight}
            width={width}
            {...virtualizationProps}
          >
            {ListRow}
          </FixedSizeList>
        )}
      </EuiAutoSizer>
    ) : (
      <EuiAutoSizer>
        {({ height, width }: EuiAutoSize) => (
          <FixedSizeList height={height} width={width} {...virtualizationProps}>
            {ListRow}
          </FixedSizeList>
        )}
      </EuiAutoSizer>
    );

  // Render the accessibility label outside the virtualized container
  // This preserves accessibility while fixing virtualization bugs
  return (
    <>
      {label}
      {virtualizedList}
    </>
  );
};

const ListRow = ({ data, index, style }: ListChildComponentProps) => {
  const row = data[index];
  row.properties.style = logicalStyles(style);
  return nodeToHtml(row, index, data, 0);
};
