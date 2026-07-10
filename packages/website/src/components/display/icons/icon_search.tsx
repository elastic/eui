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

import {
  filterIconTypes,
  type IconSearchSynonyms,
} from './icon_filter';

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
  placeholder = 'Search glyph icons',
  iconSize = 'm',
  renderIcon,
  resultThemeMode,
}: IconSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const placeholderText = `${placeholder} (${iconTypes.length})`;

  const filteredIconTypes = useMemo(
    () => filterIconTypes(iconTypes, searchValue, iconSynonyms),
    [iconTypes, iconSynonyms, searchValue]
  );

  return (
    <>
      <EuiFieldSearch
        placeholder={placeholderText}
        aria-label={placeholderText}
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
