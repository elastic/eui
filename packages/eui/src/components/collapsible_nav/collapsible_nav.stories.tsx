/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/react';
import { find, findIndex } from 'lodash';

import { EuiButton, EuiButtonIcon } from '../button';
import { EuiCollapsibleNav, EuiCollapsibleNavProps } from './collapsible_nav';
import { EuiCollapsibleNavGroup } from './collapsible_nav_group';
import { EuiFlexItem } from '../flex';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiHeader,
} from '../header';
import { EuiHorizontalRule } from '../horizontal_rule';
import { EuiIcon } from '../icon';
import { EuiLink } from '../link';
import { EuiPageTemplate } from '../page_template';
import {
  EuiPinnableListGroupItemProps,
  EuiListGroup,
  EuiPinnableListGroup,
} from '../list_group';
import { EuiText } from '../text';
import { disableStorybookControls } from '../../../.storybook/utils';
import { logicalCSSWithFallback } from '../../global_styling/functions';
import { useGeneratedHtmlId } from '../../services';
import { EuiCode } from '../code';

const meta: Meta<EuiCollapsibleNavProps> = {
  title: 'Navigation/EuiCollapsibleNav/EuiCollapsibleNav',
  component: EuiCollapsibleNav,
  argTypes: {
    as: { options: ['nav', 'div'], control: 'radio' },
    maxWidth: { control: 'number' }, // TODO: also accepts bool | string
  },
  args: {
    // Component defaults
    as: 'nav',
    side: 'left',
    size: 320,
    paddingSize: 'none',
    pushAnimation: false,
    pushMinBreakpoint: 'l',
    isDocked: false,
    dockedBreakpoint: 'l',
    showButtonIfDocked: false,
    closeButtonPosition: 'outside',
    hideCloseButton: false,
    includeFixedHeadersInFocusTrap: true,
    outsideClickCloses: true,
    ownFocus: true,
  },
  // TODO: Improve props inherited from EuiFlyout, ideally through
  // a DRY import from `flyout.stories.tsx` once that's created
};
disableStorybookControls(meta, ['button']);

export default meta;
type Story = StoryObj<EuiCollapsibleNavProps>;

const StatefulCollapsibleNav = (props: Partial<EuiCollapsibleNavProps>) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <EuiCollapsibleNav
      {...props}
      isOpen={isOpen}
      button={
        <EuiButton onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Toggle nav
        </EuiButton>
      }
      onClose={(...args) => {
        setIsOpen(false);
        action('onClose')(...args);
      }}
    />
  );
};

export const Playground: Story = {
  render: ({ ...args }) => <StatefulCollapsibleNav {...args} />,
  args: {
    children: 'Collapsible nav content',
    isOpen: true,
  },
};

/**
 * Docs fullscreen examples
 */

const KibanaNavLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Discover' },
  { label: 'Visualize' },
  { label: 'Dashboards' },
  { label: 'Canvas' },
  { label: 'Maps' },
  { label: 'Machine Learning' },
  { label: 'Graph' },
];

const TopLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    'aria-current': true,
    onClick: () => {},
    pinnable: false,
  },
];

const KibanaLinks: EuiPinnableListGroupItemProps[] = KibanaNavLinks.map(
  (link) => {
    return {
      ...link,
      onClick: () => {},
    };
  }
);

const LearnLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Docs', onClick: () => {} },
  { label: 'Blogs', onClick: () => {} },
  { label: 'Webinars', onClick: () => {} },
  { label: 'Elastic.co', onClick: () => {} },
];

const FullHeaderPatternExample = () => {
  const [navIsOpen, setNavIsOpen] = useState(true);

  // Accordion toggling
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem('openNavGroups'))) || [
      'Kibana',
      'Learn',
    ]
  );

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
  };

  // Pinning
  const [pinnedItems, setPinnedItems] = useState<
    EuiPinnableListGroupItemProps[]
  >(JSON.parse(String(localStorage.getItem('pinnedItems'))) || []);

  const addPin = (item: any) => {
    if (!item || find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
  };

  const removePin = (item: any) => {
    const pinIndex = findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: EuiPinnableListGroupItemProps[],
    showPinned = false
  ): EuiPinnableListGroupItemProps[] {
    return links.map((link) => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Unpin ${listItem.label}`;
  }

  const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });

  const collapsibleNav = (
    <EuiCollapsibleNav
      id={collapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
      // Accessibility - Add scroll to nav on very small screens
      css={css`
        @media (max-height: 15em) {
          ${logicalCSSWithFallback('overflow-y', 'auto')}
        }
      `}
    >
      {/* Dark deployments section */}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup isCollapsible={false} background="dark">
          <EuiListGroup
            maxWidth="none"
            gutterSize="none"
            size="s"
            listItems={[
              {
                label: 'Manage deployment',
                onClick: () => {},
                iconType: 'logoCloud',
                iconProps: {
                  color: 'ghost',
                },
              },
            ]}
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      {/* Shaded pinned section always with a home item */}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup
          background="light"
          style={{ maxHeight: '40vh' }}
          className="eui-yScroll"
        >
          <EuiPinnableListGroup
            aria-label="Pinned links" // A11y: Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true)
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      <EuiHorizontalRule margin="none" />

      {/* BOTTOM */}
      <EuiFlexItem
        className="eui-yScroll"
        // Accessibility - Allows nav items to be seen and interacted with on very small screen sizes
        css={css`
          @media (max-height: 15em) {
            flex: 1 0 auto;
          }
        `}
      >
        {/* Kibana section */}
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              onClick={(e) => e.stopPropagation()}
            >
              Kibana
            </a>
          }
          buttonElement="div"
          iconType="logoKibana"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Kibana')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Kibana')}
        >
          <EuiPinnableListGroup
            aria-label="Kibana" // A11y: EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(KibanaLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>

        {/* Security callout */}
        <EuiCollapsibleNavGroup
          background="light"
          iconType="logoSecurity"
          title="Elastic Security"
          isCollapsible={true}
          initialIsOpen={true}
          arrowDisplay="none"
          extraAction={
            <EuiButtonIcon
              aria-label="Hide and never show again"
              title="Hide and never show again"
              iconType="cross"
            />
          }
        >
          <EuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
            <p>
              Threat prevention, detection, and response with SIEM and endpoint
              security.
              <br />
              <EuiLink>Learn more</EuiLink>
            </p>
          </EuiText>
        </EuiCollapsibleNavGroup>

        {/* Learn section */}
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              onClick={(e) => e.stopPropagation()}
            >
              Training
            </a>
          }
          buttonElement="div"
          iconType="training"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Learn')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Learn')}
        >
          <EuiPinnableListGroup
            aria-label="Learn" // A11y: EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(LearnLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        {/* Span fakes the nav group into not being the first item and therefore adding a top border */}
        <span />
        <EuiCollapsibleNavGroup>
          <EuiButton fill fullWidth iconType="plusInCircleFilled">
            Add data
          </EuiButton>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  const leftSectionItems = [
    collapsibleNav,
    <EuiHeaderLogo iconType="logoElastic">Elastic</EuiHeaderLogo>,
  ];

  return (
    <>
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: leftSectionItems,
          },
        ]}
      />

      <EuiPageTemplate>
        <EuiPageTemplate.Header>
          <EuiText>
            <h1>Collapsible Nav</h1>
          </EuiText>
        </EuiPageTemplate.Header>
        <EuiPageTemplate.Section>
          <EuiText>
            <h2>Full pattern with header and saved pins</h2>
            <p>
              This story showcases <EuiCode>EuiHeader</EuiCode> with a toggle
              button to open an
              <EuiCode>EuiCollapsibleNav</EuiCode>, the contents of which are
              multiple EuiCollapsibleNavGroups and saves the open/closed/pinned
              state for each section and item in local store.
            </p>
          </EuiText>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </>
  );
};

export const FullHeaderPattern: Story = {
  render: ({ ...args }) => <FullHeaderPatternExample {...args} />,
};
