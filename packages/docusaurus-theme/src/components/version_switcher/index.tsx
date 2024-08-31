import { useMemo, useState } from 'react';
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

const pronounceVersion = (version: string) => {
  return `version ${version.replaceAll('.', ' point ')}`; // NVDA pronounciation issue
};

const PREV_DOCS_URL = 'https://eui.elastic.co';

type Props = {
  versions: string[];
};

export const VersionSwitcher = ({ versions }: Props) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const styles = useEuiMemoizedStyles(getStyles);

  const currentVersion = versions[0]!;

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
      aria-label="EUI version list"
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

          const url = isCurrentVersion ? '/' : `${PREV_DOCS_URL}/v${version}/`;

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
              extraAction={{
                'aria-label': `View release notes for ${screenReaderVersion}`,
                title: `View release ${version}`,
                iconType: 'package',
                iconSize: 's',
                // @ts-ignore - this is valid
                href: `https://github.com/elastic/eui/releases/tag/v${version}`,
                target: '_blank',
              }}
            />
          );
        }}
      </FixedSizeList>
    </EuiPopover>
  );
};
