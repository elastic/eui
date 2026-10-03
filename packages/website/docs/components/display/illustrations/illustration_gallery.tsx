/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/** @jsxImportSource @emotion/react */

import { useMemo, useState } from 'react';
import {
  EuiSearchBar,
  EuiSpacer,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiEmptyPrompt,
  EuiCodeBlock,
  EuiIllustration,
  Query,
  useEuiTheme,
} from '@elastic/eui';
import { css } from '@emotion/react';
import { illustrations } from '@elastic/eui-illustrations';

interface GalleryItem {
  exportName: string;
  id: string;
  title: string;
  light: string;
  dark: string;
}

const items: GalleryItem[] = Object.entries(illustrations)
  .map(([exportName, illustration]) => ({ exportName, ...illustration }))
  .sort((a, b) => a.title.localeCompare(b.title));

const getSnippet = (exportName: string) =>
  `import { EuiIllustration } from '@elastic/eui';
import { ${exportName} } from '@elastic/eui-illustrations';

<EuiIllustration type={${exportName}} />`;

export const IllustrationGallery = () => {
  const { euiTheme } = useEuiTheme();
  const [query, setQuery] = useState<Query | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query) return items;
    return Query.execute(query, items, {
      defaultFields: ['title', 'id'],
    }) as GalleryItem[];
  }, [query]);

  const selected = useMemo(
    () => filtered.find((item) => item.id === selectedId) ?? null,
    [filtered, selectedId]
  );

  return (
    <div>
      <EuiSearchBar
        box={{
          placeholder: 'Search illustrations by name',
          incremental: true,
          'aria-label': 'Search illustrations by name',
        }}
        onChange={({ query }) => setQuery(query)}
      />

      <EuiSpacer />

      {filtered.length === 0 ? (
        <EuiEmptyPrompt
          iconType="search"
          title={<h3>No illustrations found</h3>}
          body={<p>Try a different search term.</p>}
        />
      ) : (
        <EuiFlexGrid columns={3} gutterSize="m">
          {filtered.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <EuiFlexItem key={item.id}>
                <EuiPanel
                  element="button"
                  type="button"
                  hasShadow={false}
                  hasBorder
                  paddingSize="s"
                  onClick={() => setSelectedId(isSelected ? null : item.id)}
                  aria-pressed={isSelected}
                  aria-label={`Show code for ${item.title}`}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    transition: box-shadow ${euiTheme.animation.fast}
                        ease-in-out,
                      border-color ${euiTheme.animation.fast} ease-in-out;

                    &:hover {
                      border-color: ${euiTheme.colors.primary};
                    }

                    ${isSelected &&
                    css`
                      border-color: ${euiTheme.colors.primary};
                      box-shadow: inset 0 0 0 ${euiTheme.border.width.thick}
                        ${euiTheme.colors.primary};
                    `}
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: ${euiTheme.size.m};
                      background-color: ${euiTheme.colors.lightestShade};
                      border-radius: ${euiTheme.border.radius.medium};
                      margin-bottom: ${euiTheme.size.s};
                    `}
                  >
                    <EuiIllustration type={item} alt="" />
                  </div>
                  <EuiText
                    size="m"
                    textAlign="center"
                    css={css`
                      flex-shrink: 0;
                      font-weight: ${euiTheme.font.weight.semiBold};
                      line-height: 1;
                    `}
                  >
                    {item.title}
                  </EuiText>
                </EuiPanel>
              </EuiFlexItem>
            );
          })}
        </EuiFlexGrid>
      )}
      {selected && (
        <>
          <EuiSpacer />
          <EuiCodeBlock language="tsx" fontSize="m" paddingSize="m" isCopyable>
            {getSnippet(selected.exportName)}
          </EuiCodeBlock>
        </>
      )}
    </div>
  );
};
