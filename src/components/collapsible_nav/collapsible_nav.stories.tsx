/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { EuiButton } from '../button';
import { EuiCollapsibleNav, EuiCollapsibleNavProps } from './collapsible_nav';

const meta: Meta<EuiCollapsibleNavProps> = {
  title: 'EuiCollapsibleNav',
  component: EuiCollapsibleNav,
  // TODO: Improve props inherited from EuiFlyout, ideally through
  // a DRY import from `flyout.stories.tsx` once that's created
};

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
      onClose={() => setIsOpen(false)}
    />
  );
};

export const Playground: Story = {
  render: ({ ...args }) => <StatefulCollapsibleNav {...args} />,
  args: {
    children: 'Collapsible nav content',
    isOpen: true,
    isDocked: false,
    dockedBreakpoint: 'l',
    showButtonIfDocked: false,
    size: 240,
  },
};

/**
 * Full pattern demo - this was copied from src-docs examples,
 * and is meant to be an imitation of Kibana's production nav
 */
import { css } from '@emotion/react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import { logicalCSSWithFallback } from '../../global_styling';
import {
  EuiButtonIcon,
  EuiIcon,
  EuiText,
  EuiLink,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiHeader,
  EuiPageTemplate,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiSkeletonText,
  EuiListGroup,
} from '../../components';

import { EuiCollapsibleNavGroup } from './collapsible_nav_group';

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
const KibanaLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Discover', onClick: () => {} },
  { label: 'Visualize', onClick: () => {} },
  { label: 'Dashboards', onClick: () => {} },
  { label: 'Canvas', onClick: () => {} },
  { label: 'Maps', onClick: () => {} },
  { label: 'Machine Learning', onClick: () => {} },
  { label: 'Graph', onClick: () => {} },
];

const LearnLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Docs', onClick: () => {} },
  { label: 'Blogs', onClick: () => {} },
  { label: 'Webinars', onClick: () => {} },
  { label: 'Elastic.co', href: 'https://elastic.co' },
];

const CollapsibleNavAll = () => {
  const [navIsOpen, setNavIsOpen] = useState(true);

  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(['Kibana', 'Learn']);

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
  };

  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState<
    EuiPinnableListGroupItemProps[]
  >([]);

  const addPin = (item: any) => {
    if (!item || find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
  };

  const removePin = (item: any) => {
    const pinIndex = findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
    }
  };

  const collapsibleNav = (
    <EuiCollapsibleNav
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
                href: '#',
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
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={TopLinks.concat(pinnedItems)}
            unpinTitle={({ label }) => `Unpin ${label}`}
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
              href="#/navigation/collapsible-nav"
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
            aria-label="Kibana" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={KibanaLinks}
            pinTitle={({ label }) => `Pin ${label}`}
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
              href="#/navigation/collapsible-nav"
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
            aria-label="Learn" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={LearnLinks}
            pinTitle={({ label }) => `Pin ${label}`}
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

  return (
    <>
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [
              collapsibleNav,
              <EuiHeaderLogo iconType="logoElastic">Elastic</EuiHeaderLogo>,
            ],
            borders: 'right',
          },
        ]}
      />

      <EuiPageTemplate>
        <EuiPageTemplate.EmptyPrompt>
          <EuiSkeletonText />
        </EuiPageTemplate.EmptyPrompt>
      </EuiPageTemplate>
    </>
  );
};

export const FullPattern: Story = {
  render: () => <CollapsibleNavAll />,
};
