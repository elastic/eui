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
  // NOTE: Don't inject other content (e.g. a label) inside this outer virtualized
  // container as react-window requires this to be stable for scroll calculations.
  // Instead, inject it into the inner virtualized element.
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
        <>
          {label}
          <code
            style={logicalStyles(style)}
            {...props}
            ref={ref}
            {...codeProps}
          />
        </>
      )),
    [codeProps, label]
  );

  const virtualizationProps = {
    itemData: data,
    itemSize: rowHeight,
    itemCount: data.length,
    outerElementType: VirtualizedOuterElement,
    innerElementType: VirtualizedInnerElement,
  };

  return typeof overflowHeight === 'number' ? (
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
};

const ListRow = ({ data, index, style }: ListChildComponentProps) => {
  const row = data[index];
  row.properties.style = logicalStyles(style);
  return nodeToHtml(row, index, data, 0);
};
