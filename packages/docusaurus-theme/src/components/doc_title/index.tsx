/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { css } from '@emotion/react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  useGeneratedHtmlId,
} from '@elastic/eui';

interface StorybookItem {
  id: string;
  label: string;
}

function isStorybookItem(value: unknown): value is StorybookItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    'label' in value &&
    typeof value.label === 'string' &&
    value.label.trim().length > 0
  );
}

// Only document pages provide this context; other MDX headings remain unchanged.
export const DocStorybookContext = createContext<unknown>(undefined);

const titleStyles = css`
  margin-block: var(--eui-theme-content-vertical-spacing);

  & h1.heading {
    margin-block: 0;
  }
`;

export const DocTitle = ({ children }: PropsWithChildren) => {
  const storybook = useContext(DocStorybookContext);
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.customFields?.storybookBaseUrl;
  const [isOpen, setIsOpen] = useState(false);
  const popoverId = useGeneratedHtmlId({ prefix: 'docStorybook' });

  const storyId = typeof storybook === 'string' ? storybook.trim() : undefined;
  const stories = Array.isArray(storybook)
    ? storybook.filter(isStorybookItem)
    : [];

  if ((!storyId && stories.length === 0) || typeof baseUrl !== 'string') {
    return <>{children}</>;
  }

  const href = (id: string) =>
    `${baseUrl.replace(/\/$/, '')}/index.html?path=/story/${encodeURIComponent(
      id
    )}`;
  const popoverButton = (
    <EuiButtonEmpty
      iconType="chevronSingleDown"
      iconSide="right"
      onClick={() => setIsOpen(!isOpen)}
    >
      Open in Storybook
    </EuiButtonEmpty>
  );

  return (
    <EuiFlexGroup
      css={titleStyles}
      alignItems="center"
      justifyContent="spaceBetween"
      wrap
    >
      <EuiFlexItem>{children}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        {storyId ? (
          <EuiButtonEmpty
            iconType="external"
            href={href(storyId)}
            target="_blank"
          >
            Open in Storybook
          </EuiButtonEmpty>
        ) : (
          <BrowserOnly fallback={popoverButton}>
            {() => (
              <EuiPopover
                id={popoverId}
                aria-label="Storybook components"
                isOpen={isOpen}
                closePopover={() => setIsOpen(false)}
                panelPaddingSize="none"
                button={popoverButton}
              >
                <EuiContextMenuPanel
                  initialFocusedItemIndex={0}
                  items={stories.map(({ id, label }) => (
                    <EuiContextMenuItem
                      key={id}
                      href={href(id)}
                      target="_blank"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </EuiContextMenuItem>
                  ))}
                />
              </EuiPopover>
            )}
          </BrowserOnly>
        )}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
