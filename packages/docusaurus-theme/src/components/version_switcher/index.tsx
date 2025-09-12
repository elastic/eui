/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ComponentProps, useState } from 'react';
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
};

export const VersionSwitcher = ({
  ariaLabel,
  currentVersion,
  extraAction,
  previousVersionUrl,
  versions,
}: VersionSwitcherProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const styles = useEuiMemoizedStyles(getStyles);

  if (!versions) return null;

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
        itemCount={versions.length}
        itemSize={24}
        height={200}
        width={120}
        innerElementType="ul"
      >
        {({ index, style }) => {
          const version = versions[index];
          const isCurrentVersion = version === currentVersion;
          const screenReaderVersion = pronounceVersion(version!);

          const url = isCurrentVersion
            ? '/'
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
