/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useCallback, type UIEvent, JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme-original/DocSidebar/Desktop/Content';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

import DocSidebarItems from '../../../DocSidebarItems';
import { DocSidebarTitle } from '../../sidebar_title';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  root: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  `,
  menu: css`
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    /* Title owns top padding; keep sides/bottom for the scrolling list */
    padding-block-start: 0;
    padding-block-end: ${euiTheme.size.m};
    padding-inline: ${euiTheme.size.s};
  `,
});

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): JSX.Element {
  const showAnnouncementBar = useShowAnnouncementBar();
  const styles = useEuiMemoizedStyles(getStyles);
  const [isMenuScrolled, setIsMenuScrolled] = useState(false);

  const onMenuScroll = useCallback((event: UIEvent<HTMLElement>) => {
    setIsMenuScrolled(event.currentTarget.scrollTop > 0);
  }, []);

  return (
    <div css={styles.root}>
      <DocSidebarTitle isScrolled={isMenuScrolled} />
      <nav
        aria-label={translate({
          id: 'theme.docs.sidebar.navAriaLabel',
          message: 'Docs sidebar',
          description: 'The ARIA label for the sidebar navigation',
        })}
        className={clsx(
          'menu thin-scrollbar',
          showAnnouncementBar && 'menuWithAnnouncementBar',
          className
        )}
        css={styles.menu}
        onScroll={onMenuScroll}
      >
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
    </div>
  );
}
