/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="../../../cypress/support"/>

import React, { useState } from 'react';
import { EuiAvatar } from '../avatar';
import { EuiBreadcrumb } from '../breadcrumbs';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';
import { EuiHeader } from './header';
import { EuiHeaderLogo } from './header_logo';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItem,
  EuiHeaderSection,
} from './header_section';
import { EuiIcon } from '../icon';
import { EuiKeyPadMenu, EuiKeyPadMenuItem } from '../key_pad_menu';
import { EuiLink } from '../link';
import { EuiPopover, EuiPopoverTitle } from '../popover';
import {
  EuiSelectable,
  EuiSelectableMessage,
  EuiSelectableOption,
  EuiSelectableProps,
  EuiSelectableTemplateSitewide,
} from '../selectable';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import { useGeneratedHtmlId } from '../../services';

const Header = () => {
  const renderLogo = () => (
    <EuiHeaderLogo
      iconType="logoElastic"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Go to home page"
    />
  );

  const renderBreadcrumbs = () => {
    const breadcrumbs: EuiBreadcrumb[] = [
      {
        text: 'Management',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
      },
      {
        text: 'Hidden',
        'data-test-subj': 'cy-breadcrumb-hidden',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
      },
      {
        text: 'Users',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
      },
      {
        text: 'Create',
      },
    ];

    return (
      <EuiHeaderBreadcrumbs
        aria-label="Header breadcrumbs example"
        breadcrumbs={breadcrumbs}
      />
    );
  };

  const search = (
    <EuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        compressed: true,
      }}
      popoverButton={
        <EuiHeaderSectionItemButton aria-label="Sitewide search">
          <EuiIcon type="search" size="m" />
        </EuiHeaderSectionItemButton>
      }
      emptyMessage={
        <EuiSelectableMessage
          style={{ minHeight: 300 }}
          data-test-subj="cy-search-menu"
        >
          <p>
            Please see the component page for{' '}
            <strong>EuiSelectableTemplateSitewide</strong>
            on how to configure your sitewide search.
          </p>
        </EuiSelectableMessage>
      }
    />
  );

  return (
    <EuiHeader>
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItem border="right">
          {renderLogo()}
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem border="right">
          <HeaderSpacesMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      {renderBreadcrumbs()}

      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>{search}</EuiHeaderSectionItem>

        <EuiHeaderSectionItem>
          <HeaderUserMenu />
        </EuiHeaderSectionItem>

        <EuiHeaderSectionItem>
          <HeaderAppMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

const HeaderUserMenu = () => {
  const headerUserPopoverId = useGeneratedHtmlId({
    prefix: 'headerUserPopover',
  });
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerUserPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerUserPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
      data-test-subj="cy-account-menu"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar name="John Username" size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>John Username</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>Edit profile</EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

const HeaderSpacesMenu = () => {
  const headerSpacesPopoverId = useGeneratedHtmlId({
    prefix: 'headerSpacesPopover',
  });
  const spacesValues: EuiSelectableOption[] = [
    {
      label: 'Sales team',
      prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
      checked: 'on',
    },
    {
      label: 'Engineering',
      prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
    },
  ];

  const [spaces, setSpaces] = useState<EuiSelectableOption[]>(spacesValues);
  const [selectedSpace, setSelectedSpace] = useState(
    spaces.filter((option) => option.checked)[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const isListExtended = () => {
    return spaces.length > 4 ? true : false;
  };

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const onChange: EuiSelectableProps['onChange'] = (options) => {
    setSpaces(options);
    setSelectedSpace(options.filter((option) => option.checked)[0]);
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerSpacesPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}
    >
      {selectedSpace.prepend}
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerSpacesPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiSelectable
        {...({
          searchable: isListExtended(),
          searchProps: {
            placeholder: 'Find a space',
            compressed: true,
          },
        } as Partial<EuiSelectableProps>)}
        options={spaces}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 40,
          showIcons: false,
        }}
        data-test-subj="cy-spaces-menu"
      >
        {(list, search) => (
          <>
            <EuiPopoverTitle paddingSize="s">
              {search || 'Your spaces'}
            </EuiPopoverTitle>
            {list}
          </>
        )}
      </EuiSelectable>
    </EuiPopover>
  );
};

const HeaderAppMenu = () => {
  const headerAppPopoverId = useGeneratedHtmlId({ prefix: 'headerAppPopover' });
  const headerAppKeyPadMenuId = useGeneratedHtmlId({
    prefix: 'headerAppKeyPadMenu',
  });

  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerAppKeyPadMenuId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Apps menu with 1 new app"
      notification="1"
      onClick={onMenuButtonClick}
    >
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerAppPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
    >
      <EuiKeyPadMenu
        id={headerAppKeyPadMenuId}
        style={{ width: 288 }}
        data-test-subj="cy-apps-menu"
      >
        <EuiKeyPadMenuItem label="Discover">
          <EuiIcon type="discoverApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Dashboard">
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Dev Tools">
          <EuiIcon type="devToolsApp" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </EuiPopover>
  );
};

beforeEach(() => {
  cy.viewport(1024, 768); // medium breakpoint
  cy.realMount(<Header />);
});

describe('EuiHeader', () => {
  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when Spaces menu is expanded', () => {
      cy.get('button[aria-label="Spaces menu"]').realClick();
      cy.get('div[data-test-subj="cy-spaces-menu"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when Account menu is expanded', () => {
      cy.get('button[aria-label="Account menu"]').realClick();
      cy.get('div[data-test-subj="cy-account-menu"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when Sitewide search is expanded', () => {
      cy.get('button[aria-label="Sitewide search"]').realClick();
      cy.get('div[data-test-subj="cy-search-menu"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when Apps menu is expanded', () => {
      cy.get('button[aria-label="Apps menu with 1 new app"]').realClick();
      cy.get('ul[data-test-subj="cy-apps-menu"]').should('exist');
      cy.checkAxe();
    });

    it('has zero violations when a hidden breadcrumb is expanded', () => {
      cy.get('button[aria-label="See collapsed breadcrumbs"]').realClick();
      cy.get('a[data-test-subj="cy-breadcrumb-hidden"]').should('exist');
      cy.checkAxe();
    });
  });
});
