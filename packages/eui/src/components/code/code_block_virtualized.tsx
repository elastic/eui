/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  memo,
  useContext,
  useMemo,
} from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { RefractorNode } from 'refractor';
import { logicalStyles } from '../../global_styling';
import {
  EuiAutoSizer,
  EuiAutoSize,
  EuiAutoSizeHorizontal,
} from '../auto_sizer';
import { nodeToHtml } from './utils';

type VirtualizedElementProps = {
  preProps: HTMLAttributes<HTMLPreElement>;
  codeProps: HTMLAttributes<HTMLElement>;
  label: ReactNode;
};

// Context is required to pass props to react-window's outerElementType and
// innerElementType, which must keep a stable identity or every row remounts.
// @see https://github.com/bvaughn/react-window/issues/404
const VirtualizedElementPropsContext = createContext<VirtualizedElementProps>({
  preProps: {},
  codeProps: {},
  label: null,
});

// NOTE: Don't inject other content (e.g. a label) inside this outer virtualized
// container as react-window requires this to be stable for scroll calculations.
// Instead, inject it into the inner virtualized element.
const VirtualizedOuterElement = memo(
  forwardRef<any, any>(({ style, ...props }, ref) => {
    const { preProps } = useContext(VirtualizedElementPropsContext);
    return (
      <pre style={logicalStyles(style)} {...props} ref={ref} {...preProps} />
    );
  })
);
VirtualizedOuterElement.displayName = 'EuiCodeBlockVirtualizedOuterElement';

// react-window's `style` must come after `codeProps`: it sets the block size
// that establishes the list's scroll range, which a consumer `style` would
// otherwise overwrite.
const VirtualizedInnerElement = memo(
  forwardRef<any, any>(({ style, ...props }, ref) => {
    const { codeProps, label } = useContext(VirtualizedElementPropsContext);
    return (
      <>
        {label}
        <code
          {...codeProps}
          style={logicalStyles(style)}
          {...props}
          ref={ref}
        />
      </>
    );
  })
);
VirtualizedInnerElement.displayName = 'EuiCodeBlockVirtualizedInnerElement';

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
  const elementProps = useMemo(
    () => ({ preProps, codeProps, label }),
    [preProps, codeProps, label]
  );

  const virtualizationProps = {
    itemData: data,
    itemSize: rowHeight,
    itemCount: data.length,
    outerElementType: VirtualizedOuterElement,
    innerElementType: VirtualizedInnerElement,
  };

  return (
    <VirtualizedElementPropsContext.Provider value={elementProps}>
      {typeof overflowHeight === 'number' ? (
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
            <FixedSizeList
              height={height}
              width={width}
              {...virtualizationProps}
            >
              {ListRow}
            </FixedSizeList>
          )}
        </EuiAutoSizer>
      )}
    </VirtualizedElementPropsContext.Provider>
  );
};

const ListRow = ({ data, index, style }: ListChildComponentProps) => {
  const row = data[index];
  row.properties.style = logicalStyles(style);
  return nodeToHtml(row, index, data, 0);
};
