/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from '@docusaurus/router';
import {
  EuiButtonEmpty,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { useDocSidebarSections } from './use_doc_sidebar_sections';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  root: css`
    flex-shrink: 0;
    padding-inline: ${euiTheme.size.m};
    padding-block: ${euiTheme.size.m} ${euiTheme.size.s};
    /* Match page canvas so the fixed header blends when at rest */
    background-color: ${euiTheme.colors.backgroundBaseSubdued};
    border-block-end: ${euiTheme.border.width.thin} solid transparent;
  `,
  rootScrolled: css`
    border-block-end-color: ${euiTheme.border.color};
  `,
  button: css`
    font-weight: ${euiTheme.font.weight.bold};
  `,
  list: css`
    min-inline-size: ${euiTheme.base * 12}px;
  `,
});

export const DocSidebarTitle = ({
  isScrolled = false,
}: {
  isScrolled?: boolean;
}) => {
  const { sections, activeSidebarId, activeLabel } = useDocSidebarSections();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const history = useHistory();
  const styles = useEuiMemoizedStyles(getStyles);

  if (!activeLabel || sections.length === 0) {
    return null;
  }

  const button = (
    <EuiButtonEmpty
      size="s"
      color="text"
      iconType={isPopoverOpen ? 'chevronSingleDown' : 'chevronSingleRight'}
      iconSize="s"
      iconSide="right"
      flush="both"
      css={styles.button}
      onClick={() => setPopoverOpen((open) => !open)}
      aria-label={`${activeLabel}. Switch docs section`}
      aria-expanded={isPopoverOpen}
    >
      {activeLabel}
    </EuiButtonEmpty>
  );

  return (
    <div css={[styles.root, isScrolled && styles.rootScrolled]}>
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={() => setPopoverOpen(false)}
        button={button}
        panelPaddingSize="s"
        anchorPosition="downLeft"
        repositionOnScroll
        aria-label="Docs sections"
      >
        <EuiListGroup css={styles.list} maxWidth={false}>
          {sections.map((section) => {
            const isActive = section.sidebarId === activeSidebarId;

            return (
              <EuiListGroupItem
                key={section.sidebarId}
                label={section.label}
                isActive={isActive}
                color={isActive ? 'primary' : 'text'}
                onClick={() => {
                  setPopoverOpen(false);
                  if (!isActive) {
                    history.push(section.path);
                  }
                }}
              />
            );
          })}
        </EuiListGroup>
      </EuiPopover>
    </div>
  );
};
