/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ComponentProps, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { FixedSizeList } from 'react-window';
import {
  EuiButtonEmpty,
  euiFocusRing,
  EuiListGroupItem,
  EuiPopover,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    button: css`
      font-weight: ${euiTheme.font.weight.bold};
      color: ${euiTheme.colors.primary};
    `,
    listItem: css`
      .euiListGroupItem__button:focus-visible {
        // overriding the global "outset" style to ensure the focus style is not cut off
        ${euiFocusRing(euiThemeContext, 'inset', {
          color: euiTheme.colors.primary,
        })};
      }
    `,
  };
};

/**
 * Addresses NVDA pronunciation issue
 */
const pronounceVersion = (version: string) => {
  return `version ${version.replaceAll('.', ' point ')}`;
};

export type VersionSwitcherProps = {
  /**
   * Aria label for the version switcher popover
   */
  ariaLabel: string;
  /*
   * The current version of the documentation
   */
  currentVersion: string;
  /**
   * Extra action to be displayed in the version switcher
   */
  extraAction?: (
    version?: string
  ) => ComponentProps<typeof EuiListGroupItem>['extraAction'];
  /**
   * URL to the previous version of the documentation
   * E.g. https://eui.elastic.co
   */
  previousVersionUrl?: string;
  /**
   * List of available versions to switch to
   */
  versions: string[];
  /**
   * URL to fetch the latest list of versions from.
   * When provided, versions are fetched client-side from this URL,
   * falling back to the static `versions` prop if the fetch fails.
   * This ensures all deployed versions are always visible in the switcher.
   */
  versionsUrl?: string;
};

export const VersionSwitcher = ({
  ariaLabel,
  currentVersion,
  extraAction,
  previousVersionUrl,
  versions,
  versionsUrl,
}: VersionSwitcherProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [allVersions, setAllVersions] = useState(versions);
  const styles = useEuiMemoizedStyles(getStyles);

  // Fetch the latest versions list from the main deployment
  // to ensure the switcher always shows all available versions,
  // even on older documentation deployments
  useEffect(() => {
    if (!versionsUrl) return;

    fetch(versionsUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch versions');
        return response.json();
      })
      .then((data) => {
        if (data?.euiVersions?.length) {
          // Ensure the current version is always included
          const fetchedVersions: string[] = data.euiVersions;
          if (!fetchedVersions.includes(currentVersion)) {
            fetchedVersions.push(currentVersion);
          }
          setAllVersions(fetchedVersions);
        }
      })
      .catch(() => {
        // Silently fall back to statically bundled versions
      });
  }, [versionsUrl, currentVersion]);

  if (!allVersions?.length) return null;

  const latestVersion = allVersions[0];

  const button = (
    <EuiButtonEmpty
      size="s"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      css={styles.button}
      onClick={() => setPopoverOpen((isOpen) => !isOpen)}
      aria-label={`${pronounceVersion(
        currentVersion
      )}. Click to switch versions`}
    >
      v{currentVersion}
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      button={button}
      repositionOnScroll
      panelPaddingSize="xs"
      aria-label={ariaLabel}
    >
      <FixedSizeList
        className="eui-yScroll"
        itemCount={allVersions.length}
        itemSize={24}
        height={200}
        width={120}
        innerElementType="ul"
      >
        {({ index, style }) => {
          const version = allVersions[index];
          const isCurrentVersion = version === currentVersion;
          const screenReaderVersion = pronounceVersion(version!);

          const url = version === latestVersion
            ? `${previousVersionUrl}/`
            : `${previousVersionUrl}/v${version}/`;

          return (
            <EuiListGroupItem
              css={styles.listItem}
              style={style}
              size="xs"
              label={`v${version}`}
              aria-label={screenReaderVersion}
              href={url}
              isActive={isCurrentVersion}
              color={isCurrentVersion ? 'primary' : 'text'}
              extraAction={extraAction?.(version)}
            />
          );
        }}
      </FixedSizeList>
    </EuiPopover>
  );
};
