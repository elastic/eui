/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  FunctionComponent,
  ElementType,
  useMemo,
} from 'react';

import { CommonProps } from '../common';
import { EuiMark, EuiMarkProps } from '../mark';

import { HighlightAll } from './_highlight_all';
import { HighlightFirst } from './_highlight_first';

export type EuiHighlightProps = HTMLAttributes<HTMLSpanElement> &
  Pick<EuiMarkProps, 'hasScreenReaderHelpText'> &
  CommonProps & {
    /**
     * string to highlight as this component's content
     */
    children: string;

    /**
     * What to search for.
     *
     * Allows passing an array of strings (searching by multiple separate
     * words or phrases) **only** if `highlightAll` is also set to `true`.
     */
    search: string | string[];

    /**
     * Should the search be strict or not
     */
    strict?: boolean;

    /**
     * Should highlight all matches
     */
    highlightAll?: boolean;
  };

export const EuiHighlight: FunctionComponent<EuiHighlightProps> = ({
  children,
  className,
  search,
  strict = false,
  highlightAll = false,
  hasScreenReaderHelpText = true,
  ...rest
}) => {
  const hasSearch = search && search.length > 0;

  const HighlightComponent = useMemo(() => {
    const Component: FunctionComponent<{ children: string }> = ({
      children,
    }) => (
      <EuiMark hasScreenReaderHelpText={hasScreenReaderHelpText}>
        {children}
      </EuiMark>
    );
    Component.displayName = '_HighlightComponent';
    return Component;
  }, [hasScreenReaderHelpText]);

  return (
    <span className={className} {...rest}>
      {children && hasSearch ? (
        highlightAll ? (
          <HighlightAll
            searchValue={search}
            searchSubject={children}
            isStrict={strict}
            highlightComponent={HighlightComponent}
          />
        ) : (
          <HighlightFirst
            searchValue={search}
            searchSubject={children}
            isStrict={strict}
            highlightComponent={HighlightComponent}
          />
        )
      ) : (
        children
      )}
    </span>
  );
};

export type _SharedSubcomponentProps = {
  searchValue: EuiHighlightProps['search'];
  searchSubject: EuiHighlightProps['children'];
  isStrict: EuiHighlightProps['strict'];
  highlightComponent?: ElementType;
};
