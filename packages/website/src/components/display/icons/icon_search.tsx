/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { type ReactNode, useMemo, useState } from 'react';

import {
  EuiCopy,
  EuiFieldSearch,
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiThemeProvider,
} from '@elastic/eui';

export type IconSearchSynonyms<TIconType extends string = string> = Partial<
  Record<TIconType, string[]>
>;

const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [
    i,
    ...Array(b.length).fill(0),
  ]);

  for (let j = 1; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

const fuzzySubsequence = (pattern: string, value: string): boolean => {
  let patternIndex = 0;

  for (let valueIndex = 0; valueIndex < value.length; valueIndex++) {
    if (value[valueIndex] === pattern[patternIndex]) {
      patternIndex++;
      if (patternIndex === pattern.length) {
        return true;
      }
    }
  }

  return false;
};

const splitCamelCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();

const getSearchTerms = (
  iconType: string,
  synonyms?: IconSearchSynonyms
): string[] => {
  const iconName = String(iconType);
  const terms = new Set<string>([
    iconName.toLowerCase(),
    splitCamelCase(iconName),
  ]);

  synonyms?.[iconType]?.forEach((synonym) => {
    terms.add(synonym.toLowerCase());
  });

  return [...terms];
};

const scoreTerm = (query: string, term: string): number => {
  if (term.includes(query)) {
    return 1000 - term.indexOf(query);
  }

  if (fuzzySubsequence(query, term)) {
    return 500;
  }

  const maxDistance = Math.max(1, Math.floor(query.length * 0.4));
  const distance = levenshtein(query, term);

  if (distance <= maxDistance) {
    return 300 - distance;
  }

  return term
    .split(/\s+/)
    .map((word) => {
      if (word.includes(query)) {
        return 400 - word.indexOf(query);
      }

      if (fuzzySubsequence(query, word)) {
        return 250;
      }

      const wordDistance = levenshtein(query, word);
      return wordDistance <= maxDistance ? 200 - wordDistance : 0;
    })
    .reduce((best, current) => Math.max(best, current), 0);
};

const scoreIconType = (
  iconType: string,
  query: string,
  synonyms?: IconSearchSynonyms
): number =>
  getSearchTerms(iconType, synonyms).reduce(
    (bestScore, term) => Math.max(bestScore, scoreTerm(query, term)),
    0
  );

const filterIconTypes = (
  iconTypes: string[],
  query: string,
  synonyms?: IconSearchSynonyms
): string[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return iconTypes;
  }

  return iconTypes
    .map((iconType) => ({
      iconType,
      score: scoreIconType(iconType, normalizedQuery, synonyms),
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        String(a.iconType).localeCompare(String(b.iconType))
    )
    .map(({ iconType }) => iconType);
};

type IconSearchProps = {
  iconTypes: string[];
  iconSynonyms?: IconSearchSynonyms;
  placeholder?: string;
  iconSize?: React.ComponentProps<typeof EuiIcon>['size'];
  renderIcon?: (iconType: string) => ReactNode;
  resultThemeMode?: React.ComponentProps<typeof EuiThemeProvider>['colorMode'];
};

export const IconSearch = ({
  iconTypes,
  iconSynonyms,
  placeholder = 'Search icons',
  iconSize = 'm',
  renderIcon,
  resultThemeMode,
}: IconSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredIconTypes = useMemo(
    () => filterIconTypes(iconTypes, searchValue, iconSynonyms),
    [iconTypes, iconSynonyms, searchValue]
  );

  return (
    <>
      <EuiFieldSearch
        placeholder={placeholder}
        aria-label={placeholder}
        onSearch={setSearchValue}
        incremental
        isClearable
        fullWidth
      />
      <EuiSpacer />
      {filteredIconTypes.length === 0 ? (
        <EuiText size="s" color="subdued">
          <p>No icons match &ldquo;{searchValue}&rdquo;.</p>
        </EuiText>
      ) : (
        <EuiFlexGrid direction="row" columns={3}>
          {filteredIconTypes.map((iconType) => (
            <EuiFlexItem key={iconType}>
              <EuiCopy
                textToCopy={iconType}
                afterMessage={`${iconType} copied`}
                tooltipProps={{ display: 'block' }}
              >
                {(copy) => (
                  <EuiThemeProvider colorMode={resultThemeMode}>
                    <EuiPanel
                      hasShadow={false}
                      hasBorder={false}
                      onClick={copy}
                      paddingSize="s"
                    >
                      {renderIcon ? (
                        renderIcon(iconType)
                      ) : (
                        <EuiIcon
                          className="eui-alignMiddle"
                          type={iconType}
                          size={iconSize}
                        />
                      )}
                      {'\u2003'} <small>{iconType}</small>
                    </EuiPanel>
                  </EuiThemeProvider>
                )}
              </EuiCopy>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      )}
    </>
  );
};
