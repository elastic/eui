/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
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

// react-window owns the list's block size (which sets the scroll range) and
// disables `pointerEvents` while scrolling. Consumer styles that constrain the
// block size are dropped, and react-window's values come last so a consumer
// reset such as `all: unset` can't clear them. Undefined values are skipped so
// an idle list keeps the consumer's `pointerEvents`. The inline size doesn't
// affect the scroll range, so a consumer `width`/`inlineSize` replaces the
// list's default.
const mergeListStyle = (
  consumerStyle: CSSProperties | null | undefined,
  listStyle: CSSProperties
) => {
  const {
    height,
    blockSize,
    minHeight,
    maxHeight,
    minBlockSize,
    maxBlockSize,
    ...consumerRest
  } = consumerStyle ?? {};
  const hasConsumerInlineSize =
    consumerRest.width != null || consumerRest.inlineSize != null;
  const definedListStyle = Object.fromEntries(
    Object.entries(logicalStyles(listStyle)).filter(
      ([key, value]) =>
        value !== undefined && !(hasConsumerInlineSize && key === 'inlineSize')
    )
  );
  return { ...consumerRest, ...definedListStyle };
};

const VirtualizedInnerElement = memo(
  forwardRef<any, any>(({ style, ...props }, ref) => {
    const { codeProps, label } = useContext(VirtualizedElementPropsContext);
    return (
      <>
        {label}
        <code
          {...codeProps}
          style={mergeListStyle(codeProps.style, style)}
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
