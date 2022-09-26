/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, forwardRef, useMemo } from 'react';
import { RefractorNode } from 'refractor';
import { FixedSizeList } from 'react-window';
import { EuiAutoSizer } from '../auto_sizer';
import { ListRow } from './utils';

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
      forwardRef<any, any>((props, ref) => (
        <pre {...props} ref={ref} {...preProps} />
      )),
    [preProps]
  );

  const VirtualizedInnerElement = useMemo(
    () =>
      forwardRef<any, any>((props, ref) => (
        <code {...props} ref={ref} {...codeProps} />
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
