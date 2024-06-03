import React, { useState, useMemo } from 'react';
import { FixedSizeList } from 'react-window';

import {
  EuiBadge,
  EuiPopover,
  EuiListGroupItem,
} from '../../../../src/components';

const { euiVersions } = require('./versions.json');
const currentVersion = require('../../../../package.json').version;

const pronounceVersion = (version: string) => {
  return `version ${version.replaceAll('.', ' point ')}`; // NVDA pronounciation issue
};

export const VersionSwitcher = () => {
  const [isVersionPopoverOpen, setIsVersionPopoverOpen] = useState(false);

  const versionBadge = useMemo(() => {
    return (
      <EuiBadge
        onClick={() => setIsVersionPopoverOpen((isOpen) => !isOpen)}
        onClickAriaLabel={`${pronounceVersion(
          currentVersion
        )}. Click to switch versions`}
        color="default"
      >
        v{currentVersion}
      </EuiBadge>
    );
  }, []);

  return (
    <EuiPopover
      isOpen={isVersionPopoverOpen}
      closePopover={() => setIsVersionPopoverOpen(false)}
      button={versionBadge}
      repositionOnScroll
      panelPaddingSize="xs"
    >
      <FixedSizeList
        className="eui-yScroll"
        itemCount={euiVersions.length}
        itemSize={24}
        height={200}
        width={120}
        innerElementType="ul"
      >
        {({ index, style }) => {
          const version = euiVersions[index];
          const screenReaderVersion = pronounceVersion(version);
          return (
            <EuiListGroupItem
              style={style}
              size="xs"
              label={`v${version}`}
              aria-label={screenReaderVersion}
              href={`https://eui.elastic.co/v${version}/`}
              extraAction={{
                'aria-label': `View release notes for ${screenReaderVersion}`,
                title: 'View release',
                iconType: 'package',
                iconSize: 's',
                // @ts-ignore - this is valid
                href: `https://github.com/elastic/eui/releases/tag/v${version}`,
                target: '_blank',
              }}
              isActive={version === currentVersion}
              color={version === currentVersion ? 'primary' : 'text'}
            />
          );
        }}
      </FixedSizeList>
    </EuiPopover>
  );
};
