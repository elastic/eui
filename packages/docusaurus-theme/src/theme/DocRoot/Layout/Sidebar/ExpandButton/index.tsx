import React from 'react';
import { css } from '@emotion/react';
import { translate } from '@docusaurus/Translate';
import IconArrow from '@theme-original/Icon/Arrow';

import type { Props } from '@theme-original/DocRoot/Layout/Sidebar/ExpandButton';

// converted from css modules to Emotion
const styles = {
  expandButton: css`
    @media (min-width: 997px) {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color var(--ifm-transition-fast) ease;
      background-color: var(--docusaurus-collapse-button-bg);

      &:hover,
      &:focus {
        background-color: var(--docusaurus-collapse-button-bg-hover);
      }
    }
  `,
  expandButtonIcon: css`
    transform: rotate(0);
  `,
};

export default function DocRootLayoutSidebarExpandButton({
  toggleSidebar,
}: Props): JSX.Element {
  return (
    <div
      css={styles.expandButton}
      title={translate({
        id: 'theme.docs.sidebar.expandButtonTitle',
        message: 'Expand sidebar',
        description:
          'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.expandButtonAriaLabel',
        message: 'Expand sidebar',
        description:
          'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      tabIndex={0}
      role="button"
      onKeyDown={toggleSidebar}
      onClick={toggleSidebar}
    >
      <IconArrow css={styles.expandButtonIcon} />
    </div>
  );
}
